import useChatStore, { User } from '../../store/useChatStore';
import { ChevronLeft, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SidebarSkeleton from '../../components/skeletons/SidebarSkeleton';
import useAuthStore from '../../store/useAuthStore';
import { Input } from '../UI/Input/Input';
import { Spacer } from '../UI/spacer/spacer';
import { useWindowSize } from '../../lib/useWindowSize';
import breakpoints from '../../lib/breakpoint';

const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;

function Sidebar() {
  const [windowWidth] = useWindowSize();
  const {
    getUsers,
    users,
    selectedUser,
    isGetUsersLoading,
    handleSlideMenuOnMobile,
    slideMenuOnMobile,
    subscribeToNewUnreadNotificationMessage,
    unsubscribeToNewUnreadNotificationMessages,
    handleSelectUserToChatWith,
  } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();

  const [filterFriends, setFilterFriends] = useState({
    filterName: '',
    filterOnline: false,
  });

  useEffect(() => {
    // will modify users data, will pass as a dependency and will trigger subscription
    getUsers();

    return () => {
      unsubscribeToNewUnreadNotificationMessages();
    };
  }, [getUsers, unsubscribeToNewUnreadNotificationMessages]);

  useEffect(() => {
    subscribeToNewUnreadNotificationMessage();
  }, [users, selectedUser, subscribeToNewUnreadNotificationMessage]);

  function handledisplayAllUsers() {
    if (filterFriends.filterName) {
      const filteredUsersByNameAndEmail = filterFriends.filterName
        ? users.filter(
            (user) =>
              user.fullName
                .toLowerCase()
                .includes(filterFriends.filterName.toLowerCase()) ||
              user.email
                .toLowerCase()
                .includes(filterFriends.filterName.toLowerCase())
          )
        : users;

      return filteredUsersByNameAndEmail;
    }
    if (filterFriends.filterOnline) {
      const filteredOnlineUsers = filterFriends.filterOnline
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

      return filteredOnlineUsers;
    }

    return users;
  }

  async function handleClickOnUserCard(user: User) {
    handleSelectUserToChatWith(user._id);

    // OPEN SLIDER ON MOBILE
    windowWidth < MOBILE_MAX_BREAKPOINT &&
      handleSlideMenuOnMobile({ chat: 3, usersList: 1 });
  }

  function handleShowNewNotification(user: User) {
    if (authUser?._id) {
      if (user.idsOfReceiversWhoUnreadMessages.includes(authUser._id)) {
        return true;
      }
      return false;
    }
    return false;
  }

  if (!authUser?._id) {
    return <></>;
  }

  return (
    <aside className='h-full w-full    border-base-300 flex flex-col transition-all duration-200 bg-base-200   '>
      {/* SIDEBAR HEADER */}
      <div className='border-b border-base-300 w-full  p-4'>
        <div className='flex justify-between'>
          <Users className='w-6 h-6' />
          {slideMenuOnMobile.usersList === 3 && (
            <ChevronLeft
              className='w-6 h-6 md:hidden lg:hidden'
              onClick={() => handleSlideMenuOnMobile({ chat: 3, usersList: 1 })}
            />
          )}
        </div>
        <Spacer sm={2} md={2} />

        {slideMenuOnMobile.usersList === 3 && (
          <div className='flex lg:items-center md:items-center justify-between lg:flex-row md:flex-col sm:flex-col  items-start '>
            <h4>Contacts</h4>

            <p>
              Online: {onlineUsers.length === 0 ? 0 : onlineUsers.length - 1}
            </p>
          </div>
        )}
        <Spacer size={2} />
        <Input
          type={'text'}
          placeholder={'Search a friend...'}
          className={'w-full  '}
          label={''}
          error={''}
          inputType='search'
          onChange={(e) =>
            setFilterFriends({ ...filterFriends, filterName: e.target.value })
          }
        />

        <Spacer size={1} />
        <label className='cursor-pointer flex items-center gap-2'>
          <input
            type='checkbox'
            checked={filterFriends.filterOnline}
            onChange={(e) =>
              setFilterFriends({
                ...filterFriends,
                filterOnline: e.target.checked,
              })
            }
            className='checkbox checkbox-sm'
          />
          {slideMenuOnMobile.usersList === 3 &&
            windowWidth < MOBILE_MAX_BREAKPOINT && (
              <span className='text-xs'>Show online only</span>
            )}

          {windowWidth > MOBILE_MAX_BREAKPOINT && (
            <p className='text-xs'>Show online only</p>
          )}
        </label>
      </div>

      {isGetUsersLoading ? (
        <SidebarSkeleton />
      ) : (
        // <p>Loading...</p>
        <>
          {/* USER CARDS */}
          <div className=' overflow-auto w-full  h-[calc(100vh-200px)]'>
            {handledisplayAllUsers().map((user, index) => (
              <button
                key={user._id + index}
                className={`w-full md:pl-4 lg:pl-4 pl-2 pr-4 pt-2 pb-2 flex items-center gap-3 hover:bg-base-100  relative ${
                  selectedUser?._id === user._id
                    ? 'bg-base-300 ring-1 ring-base-300'
                    : ''
                }`}
                onClick={() => handleClickOnUserCard(user)}
              >
                {/* Avatar */}
                <div className='relative mx-auto lg:mx-0 md:mx-0'>
                  <div className='w-10'>
                    <img
                      width={100}
                      height={100}
                      src={user.profilePicture || '/default-avatar.png'}
                      alt={user.fullName || 'profile picture'}
                      className='lg:size-10 md:size-10 size-7  object-cover rounded-full bg-slate-100'
                    />
                  </div>
                  {onlineUsers.includes(user._id) && (
                    <span
                      className='absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900'
                    />
                  )}
                </div>

                {/* User info  */}
                <div className=' w-full text-left min-w-0 '>
                  {slideMenuOnMobile.usersList === 3 && (
                    <>
                      <div className='font-medium truncate'>
                        <p>{user.fullName}</p>
                      </div>
                      <div className='font-medium truncate'>
                        <p>{user.email}</p>
                      </div>

                      <div className='text-sm text-zinc-400'>
                        <p className='text-xs'>
                          {onlineUsers.includes(user._id)
                            ? 'Online'
                            : 'Offline'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {handleShowNewNotification(user) && (
                  <div className='h-4 w-4 rounded-full absolute top-0 right-0  bg-red-500 text-white flex justify-center items-center'></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
