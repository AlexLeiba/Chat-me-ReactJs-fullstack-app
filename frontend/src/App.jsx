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

import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import useThemeStore from './store/useThemeStore';

import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { globalTheme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );

  return (
    <div data-theme={globalTheme}>
      <header>
        <Header />
      </header>

      <main className='flex flex-col  min-h-[calc(100vh-142px)] '>
        <Routes>
          <Route
            path='/'
            element={authUser ? <HomePage /> : <Navigate to='/sign-in' />}
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
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default App;
