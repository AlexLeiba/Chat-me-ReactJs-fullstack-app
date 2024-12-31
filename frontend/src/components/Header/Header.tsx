'use client';
import React, { useState } from 'react';
import { Container, Row, Col } from '../UI/Grid';
import {
  InfoIcon,
  LogOut,
  Menu,
  MessageCircleCode,
  Settings,
  User,
  X,
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import { useWindowSize } from '../../lib/useWindowSize';
import breakpoints from '../../lib/breakpoint';
import { cn } from '../../lib/utils';
import { Spacer } from '../UI/spacer/spacer';
import { useNavigate, Link } from 'react-router-dom';
const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;

export function Header({ type }: { type: 'auth' | 'dashboard' }) {
  const [windowWidth] = useWindowSize();
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  function handleLogout() {
    logout();
    navigate('/signin');
  }

  function handleNavigationsMenu(url: string) {
    navigate(url);

    windowWidth < MOBILE_MAX_BREAKPOINT && setOpenBurgerMenu(false);
  }
  return (
    <Container
      spacing='none'
      variant={'fluid'}
      className='fixed left-0 right-0 top-0 z-50  text-white  bg-secondary '
    >
      <Row>
        <Container spacing='none'>
          <Row>
            <Col className='flex justify-between items-center gap-2  p-2'>
              {/* LOGO */}
              <div className='flex'>
                <Link to='/' className='flex gap-1'>
                  <div className='flex justify-center items-center '>
                    <div className='rounded-2xl bg-base-100/50 p-1 flex items-center justify-center'>
                      <MessageCircleCode className='w-8 h-8 text-base-content ' />
                      <p className=' text-base-content'>{'{me}'}</p>
                    </div>
                  </div>
                </Link>
              </div>

              {windowWidth < MOBILE_MAX_BREAKPOINT && (
                <div>
                  {openBurgerMenu ? (
                    <X onClick={() => setOpenBurgerMenu(!openBurgerMenu)} />
                  ) : (
                    <Menu onClick={() => setOpenBurgerMenu(!openBurgerMenu)} />
                  )}
                </div>
              )}

              {/* LIST OF LINKS */}
              {windowWidth > MOBILE_MAX_BREAKPOINT ? (
                // Desktop navbar
                <div className='flex gap-8'>
                  {type === 'auth' && (
                    <>
                      <Link to={'/about'}>
                        <div className='flex gap-1'>
                          <InfoIcon className='cursor-pointer' />
                          <span>About</span>
                        </div>
                      </Link>

                      <Link to={'/settings'} className='flex gap-1'>
                        <Settings className='cursor-pointer' />
                        <span>Settings</span>
                      </Link>
                    </>
                  )}
                  {type === 'dashboard' && (
                    <>
                      <Link to='/' className='flex gap-1'>
                        <MessageCircleCode className='cursor-pointer' />
                        <span>Chat</span>
                      </Link>

                      <Link to='/profile' className='flex gap-1'>
                        <User className='cursor-pointer' />
                        <span>Profile</span>
                      </Link>

                      <Link to={'/about'}>
                        <div className='flex gap-1'>
                          <InfoIcon className='cursor-pointer' />
                          <span>About</span>
                        </div>
                      </Link>

                      <Link to={'/settings'} className='flex gap-1'>
                        <Settings className='cursor-pointer' />
                        <span>Settings</span>
                      </Link>

                      <button
                        onClick={() => handleLogout()}
                        className='flex gap-1 cursor-pointer'
                      >
                        <LogOut className='cursor-pointer' />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                //Burger menu mobile

                <div
                  className={cn(
                    'mt-14 h-full backdrop-blur-lg bg-secondary/50 bg-opacity-50 w-full z-10 fixed top-0 right-0 left-0 bottom-0 ',
                    [
                      'transition-all duration-200 ease-in-out ',
                      openBurgerMenu ? 'translate-x-0' : 'translate-x-full',
                    ]
                  )}
                >
                  <div className='flex  flex-col z-20  justify-center items-center gap-12  pt-24'>
                    {/*If Authenticated links */}
                    {authUser && (
                      <div className='flex gap-12 flex-col'>
                        <div
                          onClick={() => handleNavigationsMenu('/dashboard')}
                          className='flex gap-1 cursor-pointer'
                        >
                          <MessageCircleCode className='cursor-pointer' />
                          <span>Chat</span>
                        </div>
                        <div
                          onClick={() =>
                            handleNavigationsMenu('/dashboard/profile')
                          }
                          className='flex gap-1 cursor-pointer'
                        >
                          <User className='cursor-pointer' />
                          <span>Profile</span>
                        </div>
                      </div>
                    )}
                    <div
                      onClick={() =>
                        handleNavigationsMenu(
                          type === 'auth' ? '/about' : '/dashboard/about'
                        )
                      }
                      className='flex gap-1 cursor-pointer'
                    >
                      <InfoIcon />
                      <span>About</span>
                    </div>
                    <div
                      onClick={() =>
                        handleNavigationsMenu(
                          type === 'auth' ? '/settings' : '/dashboard/settings'
                        )
                      }
                      className='flex gap-1 cursor-pointer'
                    >
                      <Settings className='cursor-pointer' />
                      <span>Settings</span>
                    </div>

                    {authUser?._id && (
                      <>
                        <Spacer size={4} />
                        <button
                          onClick={() => handleLogout()}
                          className='flex gap-1 cursor-pointer'
                        >
                          <LogOut className='cursor-pointer' />
                          <span>Logout</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}
