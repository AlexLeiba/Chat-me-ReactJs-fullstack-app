import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import useAuthStore from './useAuthStore';

export type User = {
  _id: string;
  email: string;
  fullName: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
  sentNewMessageNotification: boolean;
  selectedUserToChatWithId: string | null;
  idsOfSendersWhoLeftUnreadMessages: string[];
  idsOfReceiversWhoUnreadMessages: string[];
  favoriteTheme: string;
  lastTimeActive: string;
};

type MessagesType = {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  read: boolean;
  isSelectedUserToChatWith: boolean;
};

type MessageType = {
  message: string;
  image: string;
};

type ChatStoreType = {
  messages: MessagesType[];
  users: User[];
  idsOfReceiversWhoUnreadMessages: string[];
  selectedUser: User | null;

  isGetUsersLoading: boolean;
  isMessagesLoading: boolean;

  onlineUsers: string[];

  slideMenuOnMobile: {
    chat: 1 | 2 | 3 | 4 | undefined;
    usersList: 1 | 2 | 3 | 4 | undefined;
  };

  getUsers: () => void;
  sendMessage: (message: MessageType, selectedUserId: string) => void;
  getMessages: (selectedUserId: string) => void;
  subscribeToMessages: () => void;
  unsubscribeToMessages: () => void;
  handleSlideMenuOnMobile: ({
    chat,
    usersList,
  }: {
    chat: 1 | 2 | 3 | 4 | undefined;
    usersList: 1 | 2 | 3 | 4 | undefined;
  }) => void;
  subscribeToNewUnreadNotificationMessage: () => void;
  unsubscribeToNewUnreadNotificationMessages: () => void;
  handleSelectUserToChatWith: (userIdToChatWith: string) => void;
  handleUnselectUserToChatWith: () => void;
};

const useChatStore = create<ChatStoreType>((set, get) => ({
  // LOADINGS
  isGetUsersLoading: false,
  isMessagesLoading: false,
  //

  onlineUsers: [],

  messages: [],
  users: [],
  selectedUser: null,

  sendMessage: async (messageObj, selectedUserId) => {
    const { messages } = get();

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUserId}`,
        messageObj
      );

      set({ messages: [...messages, response.data] });
    } catch (error: any) {
      console.log('🚀 ~ sendMessage: ~ error:=>>>\n\n\n', error);
      if (error.response.data.message) {
        return toast.error(error.response.data.message);
      } else if (error.response.statusText) {
        return toast.error(error.response.statusText);
      }
      toast.error(
        'Something went wrong, please try again with a smaller image'
      );
    }
  },

  getUsers: async () => {
    //to listen to the online users if i got a new message from them

    set({ isGetUsersLoading: true });
    try {
      const response = await axiosInstance.get('/messages/users');

      set({ users: response.data, isGetUsersLoading: false });
    } catch (error: any) {
      set({ users: [], isGetUsersLoading: false });
      console.log('🚀 \n\n ~ getUsers: ~ error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.statusText) {
        toast.error(error.response.statusText);
      } else if (error.message) {
        toast.error(error.message);
      }
    } finally {
      set({ isGetUsersLoading: false });
    }
  },

  getMessages: async (selectedUserId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${selectedUserId}`);
      set({ messages: response.data, isMessagesLoading: false });
    } catch (error: any) {
      console.log('🚀 \n\n ~ getMessages: ~ error:', error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.statusText) {
        toast.error(error.response.statusText);
      } else if (error.message) {
        toast.error(error.message);
      }

      set({ messages: [], isMessagesLoading: false });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // SUBSCRIBE TO MESSAGES WITH SOCKET
  subscribeToMessages: () => {
    const { messages, selectedUser } = get();

    if (!selectedUser) return; //only subscribe to messages when the user is selected

    const socket = useAuthStore.getState().socked;

    if (!socket) return;

    socket.on('newMessage', (newMessage: MessagesType) => {
      if (newMessage.senderId === selectedUser._id) {
        //is message sent from selected user

        set({ messages: [...messages, newMessage] });
      }

      return;
    });
  },
  // SUBSCRIBE TO MESSAGES WITH SOCKET
  subscribeToNewUnreadNotificationMessage: () => {
    const { getUsers } = get();

    const socket = useAuthStore.getState().socked;

    if (!socket) return;

    socket.on(
      'newUnreadNotificationMessage',
      (usersWithSentUnreadMessages: MessagesType) => {
        if (usersWithSentUnreadMessages.senderId) {
          if (usersWithSentUnreadMessages.isSelectedUserToChatWith) {
            return; //if both user are already in conversation DONT GET NOTIFICATION
          }

          return getUsers(); //refetch users with new unread messages notification
        }

        return;
      }
    );
  },
  unsubscribeToNewUnreadNotificationMessages: () => {
    const socket = useAuthStore.getState().socked;
    if (socket) {
      socket.off('newUnreadNotificationMessage'); //unsubscribe to messages when the user is not selected
    }
  },

  handleSelectUserToChatWith: async (userIdToChatWith: string) => {
    const { users } = get();

    const authUser = useAuthStore.getState().authUser;

    //Filter opened chats on frontend to avoid re-renders of sidebar on each click to show the latest notification
    const filteredUsersOptimistically = users.map((user: User) => {
      if (user._id === userIdToChatWith && authUser?._id) {
        return {
          ...user,
          idsOfReceiversWhoUnreadMessages:
            user.idsOfReceiversWhoUnreadMessages.filter(
              (id: string) => id !== authUser._id
            ),
        };
      }
      return user;
    });

    try {
      const response = await axiosInstance.put(
        `/messages/select-user-to-chat-with`,
        {
          id: userIdToChatWith,
        }
      );

      set({ selectedUser: response.data, users: filteredUsersOptimistically });
    } catch (error: any) {
      console.log('🚀 ~ handleSelectUserToChatWith: ~ error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.statusText) {
        toast.error(error.response.statusText);
      } else if (error.message) {
        toast.error(error.message);
      }
    }
  },
  idsOfReceiversWhoUnreadMessages: [],
  handleUnselectUserToChatWith: async () => {
    try {
      set({ selectedUser: null });
      await axiosInstance.put('/messages/unselect-user-to-chat-with');
    } catch (error: any) {
      console.log('🚀 ~ handleUnselectUserToChatWith: ~ error:\n\n\n\n', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.statusText) {
        toast.error(error.response.statusText);
      } else if (error.message) {
        toast.error(error.message);
      }
    }
  },

  slideMenuOnMobile: { chat: 1, usersList: 3 },
  handleSlideMenuOnMobile: ({
    chat,
    usersList,
  }: {
    chat: 1 | 2 | 3 | 4 | undefined;
    usersList: 1 | 2 | 3 | 4 | undefined;
  }) => {
    set({ slideMenuOnMobile: { chat, usersList } });
  },
  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socked;

    if (socket) {
      socket.off('newMessage'); //unsubscribe to messages when the user is not selected
    }
  },
}));
export default useChatStore;
