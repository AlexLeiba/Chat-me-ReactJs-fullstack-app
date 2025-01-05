import { create, StoreApi, UseBoundStore } from 'zustand';
import axiosInstance from '../lib/axios';
import { SignupSchema } from '../lib/zodSchemas';
import toast from 'react-hot-toast';
import { persist } from 'zustand/middleware';
import { io } from 'socket.io-client';

type User = {
  _id: string;
  email: string;
  fullName: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
  idsOfSendersWhoLeftUnreadMessages: string[];
  idsOfReceiversWhoUnreadMessages: string[];
  lastTimeActive: string;
  favoriteTheme: string;
};

type Store = {
  // LOADINGS
  isLoadingCheckAuth: boolean;
  isLoadingSignUp: boolean;
  isLoadingSignIn: boolean;
  isLoadingUpdateProfilePicture: boolean;
  //

  authUser: User | null;

  profilePicture: string | null;

  error: string;

  isLoggedIn: boolean;

  user: User | null;

  loadingUpdateProfile: boolean;

  updateProfile: (fullName: string, favoriteTheme?: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
  checkAuth: () => void;
  signUp: (data: FormType) => void;
  signIn: (data: FormType) => void;
  logout: () => void;
  updateProfilePicture: ({
    profilePicture,
  }: {
    profilePicture: string;
  }) => void;

  // SOCKET
  connectSocket: () => void;
  disconnectSocket: () => void;
  socked: any;
  onlineUsers: string[];
};

const BACKEND_BASE_URL = '/';
// import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/';

export type FormType = Zod.infer<typeof SignupSchema>;

const useAuthStore: UseBoundStore<StoreApi<Store>> = create(
  persist(
    (set, get): Store => ({
      // SOCKET

      socked: null,
      onlineUsers: [],

      // USER DATA
      authUser: null,
      error: '',
      user: null,

      // LOG IN
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setUser: (user) => set({ user }),

      // CHECK AUTH
      isLoadingCheckAuth: true, //isCheckingAuth:boolean
      checkAuth: async () => {
        try {
          const response = await axiosInstance.get('/auth/check');
          set({ authUser: response.data });

          // connect socket
          get().connectSocket();
        } catch (error: any) {
          console.log('🚀 \n\n ~ checkAuth: ~ error:', error);
          set({ authUser: null });
        } finally {
          set({ isLoadingCheckAuth: false });
        }
      },

      // SIGN UP
      isLoadingSignUp: false,
      signUp: async (data: FormType) => {
        set({ isLoadingSignUp: true });

        try {
          const response = await axiosInstance.post('/auth/signup', data);
          set({ authUser: response.data, isLoadingSignUp: true });

          toast.success('Account created successfully');

          // connect socket
          get().connectSocket();
        } catch (error: any) {
          console.log('🚀 \n\n ~ signUp: ~ error:', error);
          set({ authUser: null, error: error.message });

          toast.error(error.response.data.message);
        } finally {
          set({ isLoadingSignUp: false });
        }
      },
      // SIGN IN
      isLoadingSignIn: false,
      signIn: async (data: FormType) => {
        set({ isLoadingSignIn: true });

        try {
          const response = await axiosInstance.post('/auth/signin', data);
          set({ authUser: response.data, isLoadingSignIn: false });

          // connect socket
          get().connectSocket();
        } catch (error: any) {
          console.log('🚀 \n\n ~ signUp: ~ error:', error);
          set({
            authUser: null,
            error: error.response?.data?.message,
            isLoadingSignIn: false,
          });

          if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
          } else if (error.message) {
            toast.error(error.message);
          }
        }
      },
      // CONNECT SOCKET
      connectSocket: () => {
        const { authUser } = get();

        const socket = io(BACKEND_BASE_URL, {
          query: {
            userId: authUser?._id, //PASS QUERY TO BACKEND OF THE CONNECTED USER
          },
        });

        // SOCKET CONNECT
        socket.connect();
        set({ socked: socket });

        //GETTING ONLINE USERS IDS
        socket.on('onlineUsers', (userIds) => {
          //listening for this vents to be emitted from the backend

          set({ onlineUsers: userIds });
        });
      },
      // DISCONNECT SOCKET
      disconnectSocket: () => {
        // only when the user is logged in just then disconnect the socket
        if (get().socked) get().socked.disconnect();

        set({ socked: null });
      },

      // LOG OUT
      logout: async () => {
        try {
          await axiosInstance.post('/auth/logout');
          set({ authUser: null });

          get().disconnectSocket();
        } catch (error: any) {
          console.log('🚀 \n\n ~ logout: ~ error:', error);

          set({ authUser: null });

          // if (error.response?.data?.message) {
          //   toast.error(error.response.data.message);
          // } else if (error?.response?.statusText) {
          //   toast.error(error.response.statusText);
          // } else if (error.message) {
          //   toast.error(error.message);
          // }
        }
      },

      // UPDATE PROFILE IMAGE
      profilePicture: '',
      isLoadingUpdateProfilePicture: false,
      updateProfilePicture: async ({
        profilePicture,
      }: {
        profilePicture: string;
      }) => {
        set({ isLoadingUpdateProfilePicture: true });

        try {
          const response = await axiosInstance.put(
            '/auth/update-profile-picture',
            {
              profilePicture,
            }
          );
          set({
            isLoadingUpdateProfilePicture: true,
            authUser: response.data,
          });

          toast.success('Profile image was updated successfully');
        } catch (error: any) {
          console.log('🚀 \n\n ~ updateProfile: ~ error:', error);

          set({
            error: error.response.data.message,
            isLoadingUpdateProfilePicture: false,
          });

          if (error.response.data.message) {
            return toast.error(error.response.data.message);
          } else if (error.response.statusText) {
            return toast.error(error.response.statusText);
          }
          return toast.error(
            'Something went wrong, please try again with a smaller image'
          );
        } finally {
          set({ isLoadingUpdateProfilePicture: false });
        }
      },

      loadingUpdateProfile: false,
      updateProfile: async (fullName: string, favoriteTheme?: string) => {
        const { authUser } = get();

        set({ loadingUpdateProfile: true });
        try {
          const response = await axiosInstance.put('/auth/update-profile', {
            fullName: fullName ? fullName : authUser?.fullName,
            favoriteTheme: favoriteTheme
              ? favoriteTheme
              : authUser?.favoriteTheme,
          });

          set({ loadingUpdateProfile: false, authUser: response.data });

          toast.success('Profile updated successfully');
        } catch (error: any) {
          set({ loadingUpdateProfile: false });
          if (error.response.data.message) {
            toast.error(error.response.data.message);
          } else if (error.response.statusText) {
            toast.error(error.response.statusText);
          } else if (error.message) {
            toast.error(error.message);
          }
        }
      },
    }),
    {
      name: 'chat-me-session', // Name of the storage key in localStorage
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['socked'].includes(key))
        ), // Exclude 'socked' from persistence in local storage
    }
  )
);

export default useAuthStore;
