import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import UserProfilePage from './pages/UserProfilePage';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import useThemeStore from './store/useThemeStore';
import useChatStore from './store/useChatStore';

import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useWindowSize } from './lib/useWindowSize';
import breakpoints from './lib/breakpoint';

const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;

const App = () => {
  const [windowWidth] = useWindowSize();
  const { pathname } = useLocation();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { selectedUser } = useChatStore();
  const { globalTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );

  function handleShowFooter() {
    if (
      MOBILE_MAX_BREAKPOINT > windowWidth &&
      selectedUser &&
      pathname === '/'
    ) {
      return false;
    }
    return true;
  }
  return (
    <div data-theme={globalTheme}>
      <header>
        <Header />
      </header>

      <main className='flex flex-col md:min-h-[calc(100vh-238px)] lg:min-h-[calc(100vh-238px)] min-h-screen '>
        <Routes>
          <Route
            path='/'
            element={
              authUser ? (
                <HomePage />
              ) : (
                !isCheckingAuth && <Navigate to='/sign-in' />
              )
            }
          />
          <Route
            path='/sign-up'
            element={!authUser ? <SignUpPage /> : <Navigate to='/' />}
          />
          <Route
            path='/sign-in'
            element={!authUser ? <LoginPage /> : <Navigate to='/' />}
          />
          <Route path='/settings' element={<SettingsPage />} />
          <Route
            path='/profile'
            element={authUser ? <ProfilePage /> : <Navigate to='/sign-in' />}
          />
          <Route
            path='/profile/:id'
            element={
              authUser ? <UserProfilePage /> : <Navigate to='/sign-in' />
            }
          />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </main>

      <Toaster />
      {handleShowFooter() && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
};
export default App;
