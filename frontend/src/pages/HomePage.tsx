import React from 'react';
import { Col, Container, Row } from '../components/UI/Grid';
import useChatStore from '../store/useChatStore';
import ChatComponent from '../components/ChatComponents/ChatComponent';
import NoChatComponent from '../components/ChatComponents/NoChatComponent';
import Sidebar from '../components/ChatComponents/Sidebar';
import { ChevronRight } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { useEffect } from 'react';

export default function HomePage() {
  const { selectedUser, slideMenuOnMobile, handleSlideMenuOnMobile } =
    useChatStore();

  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Container spacing='medium'>
      <Row className=' lg:mt-12 md:mt-12 mt-14  px-0 justify-center rounded-lg shadow-lg lg:max-h-[900px] md:max-h-[900px]  lg:h-[calc(100vh-150px)] md:h-[calc(100vh-150px)] h-[calc(100vh-60px)]'>
        <Col
          lg={3}
          md={1}
          sm={slideMenuOnMobile.usersList}
          className=' transition-all ease-out  flex h-full  overflow-hidden px-0 md:px-0 md:mx-0 lg:px-0 lg:mx-0 border-r border-base-300 rounded-l-lg  bg-secondary/15'
        >
          <Sidebar />
        </Col>

        {selectedUser ? (
          <Col
            className='px-0 transition-all ease-out flex h-full rounded-r-lg overflow-hidden lg:px-0 md:px-0  bg-pimary '
            lg={9}
            md={3}
            sm={slideMenuOnMobile.chat}
          >
            {/* CHAT */}

            <ChatComponent />
          </Col>
        ) : (
          <Col
            className='flex h-full   overflow-hidden lg:px-0 relative '
            lg={9}
            md={3}
            sm={slideMenuOnMobile.chat}
          >
            {slideMenuOnMobile.chat === 3 && (
              <div className='md:hidden lg:hidden p-2  absolute top-2 left-2'>
                <ChevronRight
                  onClick={() =>
                    handleSlideMenuOnMobile({ chat: 1, usersList: 3 })
                  }
                />
              </div>
            )}

            {/* NO CHAT STATE*/}
            <NoChatComponent />
          </Col>
        )}
      </Row>
    </Container>
  );
}
