'use client';
import { useWindowSize } from '../../lib/useWindowSize';
import useAuthStore from '../../store/useAuthStore';
import useChatStore from '../../store/useChatStore';
import { ChevronRight, Eye, X } from 'lucide-react';
import React from 'react';
import breakpoints from '../../lib/breakpoint';
import { Link } from 'react-router-dom';

const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;

function ChatHeader() {
  const [windowWidth] = useWindowSize();
  const {
    selectedUser,
    handleSlideMenuOnMobile,
    handleUnselectUserToChatWith,
    slideMenuOnMobile,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  function handleShowUserDetails() {
    if (slideMenuOnMobile.chat === 3 && windowWidth < MOBILE_MAX_BREAKPOINT) {
      return true;
    }
    if (slideMenuOnMobile.chat === 1 && windowWidth < MOBILE_MAX_BREAKPOINT) {
      return false;
    }

    return true;
  }
  if (!selectedUser) return null;
  return (
    <div className=' bg-base-200 border-b border-base-300 flex gap-2 p-4  justify-between items-center  rounded-none'>
      {/* Avatar */}
      <div className='flex gap-2 items-center justify-between'>
        {slideMenuOnMobile.usersList === 1 && (
          <ChevronRight
            className='w-6 h-6 md:hidden lg:hidden'
            onClick={() => handleSlideMenuOnMobile({ chat: 1, usersList: 3 })}
          />
        )}

        {/* ON MOBILE */}
        {windowWidth < MOBILE_MAX_BREAKPOINT &&
          slideMenuOnMobile.chat === 3 && (
            <div className='relative mx-auto '>
              <Link to={`/profile/${selectedUser._id}`}>
                <img
                  width={100}
                  height={100}
                  src={selectedUser.profilePicture || '/default-avatar.png'}
                  alt={selectedUser.fullName || 'profile picture'}
                  className='size-10 object-cover rounded-full bg-slate-100'
                />
                {onlineUsers.includes(selectedUser._id) && (
                  <span
                    className='absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-2 ring-zinc-900'
                  />
                )}
              </Link>
            </div>
          )}
        <div className='flex '>
          {/* ON DESKTOP / TABLET */}
          {windowWidth > MOBILE_MAX_BREAKPOINT && (
            <div className='relative mx-auto '>
              <Link to={`/profile/${selectedUser._id}`}>
                <img
                  width={100}
                  height={100}
                  src={selectedUser.profilePicture || '/default-avatar.png'}
                  alt={selectedUser.fullName || 'profile picture'}
                  className='size-10 object-cover rounded-full bg-slate-100'
                />
                {onlineUsers.includes(selectedUser._id) && (
                  <span
                    className='absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-2 ring-zinc-900'
                  />
                )}
              </Link>
            </div>
          )}
        </div>
        {/* User info  */}
        {handleShowUserDetails() && (
          <div className='flex gap-4'>
            <div className='lg:block text-left min-w-0'>
              <div className='font-medium truncate'>
                <p className='font-bold'>{selectedUser.fullName}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='text-sm text-zinc-400'>
                  <p className='text-xs'>
                    {onlineUsers.includes(selectedUser._id)
                      ? 'Online'
                      : 'Offline'}
                  </p>
                </div>

                <Link to={`/profile/${selectedUser._id}`}>
                  <Eye className='w-6 h-6' />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <X
        className=' cursor-pointer text-base-content/70'
        onClick={() => {
          handleUnselectUserToChatWith();
          // setSelectedUser(null);
        }}
      />
    </div>
  );
}

export default ChatHeader;
