import React from 'react';
import { useWindowSize } from '../../lib/useWindowSize';
import { MessageCircleCode } from 'lucide-react';
import breakpoints from '../../lib/breakpoint';
import useChatStore from '../../store/useChatStore';
import useAuthStore from '../../store/useAuthStore';

const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;
const NoChatComponent = () => {
  const [windowWidth] = useWindowSize();
  const { slideMenuOnMobile } = useChatStore();
  const { authUser } = useAuthStore();
  return (
    <div className='flex w-full flex-col items-center justify-center  bg-base-100/50  text-center px-1'>
      {windowWidth < MOBILE_MAX_BREAKPOINT &&
        slideMenuOnMobile.usersList === 3 && (
          <>
            <MessageCircleCode className=' animate-bounce lg:w-10 md:w-10 w-8 lg:h-10 md:h-10 h-8   text-base-content' />
          </>
        )}
      {/* Icon Display */}

      {/* Welcome Text */}
      {windowWidth < MOBILE_MAX_BREAKPOINT && slideMenuOnMobile.chat === 3 && (
        <>
          <div className='animate-bounce gap-1 flex justify-center items-center w-full'>
            <div className='rounded-2xl bg-secondary lg:p-2 md:p-2 p-1 flex items-center justify-center'>
              <MessageCircleCode className='lg:w-10 md:w-10 w-8 lg:h-10 md:h-10 h-8   text-base-content' />
              <span className='text-base-content'>{'{me}'}</span>
            </div>
          </div>
          <h2 className='text-2xl font-bold'>Hi {authUser?.fullName} !</h2>
          <p className='text-base-content/60 lg:text-l md:text-l text-s lg:text-md md:text-md'>
            Select a conversation from the sidebar to start chatting
          </p>
        </>
      )}

      {windowWidth > MOBILE_MAX_BREAKPOINT && (
        <>
          <div className='animate-bounce gap-1 flex justify-center items-center w-full'>
            <div className='rounded-2xl bg-secondary lg:p-2 md:p-2 p-1 flex items-center justify-center'>
              <MessageCircleCode className='lg:w-10 md:w-10 w-8 lg:h-10 md:h-10 h-8   text-base-content' />
              <span className='text-base-content'>{'{me}'}</span>
            </div>
          </div>
          <h2 className='text-2xl font-bold'>Hi {authUser?.fullName} !</h2>
          <p className='text-base-content/60 lg:text-l md:text-l text-s lg:text-md md:text-md'>
            Select a conversation from the sidebar to start chatting
          </p>
        </>
      )}
    </div>
  );
};

export default NoChatComponent;
