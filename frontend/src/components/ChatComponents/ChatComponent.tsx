import React, { useEffect, useRef } from 'react';
import useChatStore from '../../store/useChatStore';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
// import MessageSkeleton from '../../components/Skeletons/MessageSkeleton';
import useAuthStore from '../../store/useAuthStore';
import { format } from 'date-fns';

function ChatComponent() {
  const refMessages = useRef<HTMLDivElement>(null);
  const {
    selectedUser,
    // onlineUsers,
    messages,
    getMessages,
    isMessagesLoading,
    unsubscribeToMessages,
    subscribeToMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id || '');

    return () => {
      unsubscribeToMessages();
    };
  }, [
    getMessages,
    selectedUser?._id,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    subscribeToMessages(); //to show messeges in real time/ will update messages array
    if (refMessages.current && messages) {
      refMessages.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [messages, subscribeToMessages]);

  if (!selectedUser) return null;

  if (isMessagesLoading)
    return (
      <div className='flex h-full w-full  flex-col '>
        {/* SKELETON LOADING */}
        <div className='flex h-full w-full  flex-col '>
          <ChatHeader />

          {/* Chat skeleton */}
          {/* <MessageSkeleton /> */}
          <p>Loading...</p>

          <ChatInput />
        </div>
      </div>
    );

  return (
    <div className='flex h-full w-full  flex-col  '>
      <ChatHeader />

      <div className='flex-1  p-5 space-y-4 overflow-y-auto bg-base-100'>
        {messages.map((message, index) => (
          // CHAT CONTAINER
          <div
            ref={refMessages}
            key={message._id + index}
            className={` chat ${
              message.senderId === selectedUser?._id ? 'chat-start' : 'chat-end'
            }`}
          >
            {/* AVATAR */}
            <div className='chat-image avatar'>
              <div className='size-8 rounded-full border bg-slate-200'>
                <img
                  src={
                    message.senderId === selectedUser?._id
                      ? selectedUser?.profilePicture || '/default-avatar.png'
                      : authUser?.profilePicture || '/default-avatar.png'
                  }
                  alt='avatar'
                  width={40}
                  height={40}
                />
              </div>
            </div>
            {/*  */}

            {/* TIME CREATED */}
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {format(message.createdAt, 'MM/dd/yyyy: HH:mm')}
              </time>
            </div>

            {/* MESSAGE */}
            <div
              className={`chat-bubble flex  rounded-lg  flex-col gap-2 ${
                message.senderId === selectedUser?._id
                  ? 'bg-base-200 '
                  : 'bg-primary text-primary-content'
              }`}
            >
              {/* IMAGE */}
              {message.image && (
                <div className='w-32 h-32 rounded-lg bg-slate-200 flex justify-center items-center overflow-hidden'>
                  <img
                    className='object-contain w-full h-full'
                    src={message.image}
                    alt='avatar'
                    width={40}
                    height={40}
                  />
                </div>
              )}
              {message.message && (
                <div
                  className={` ${
                    message.senderId === selectedUser?._id
                      ? ' text-base-content/70'
                      : 'text-primary-content/70'
                  }`}
                >
                  {message.message}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  );
}

export default ChatComponent;
