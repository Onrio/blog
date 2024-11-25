import './App.css';
import { ThemeProvider } from 'next-themes';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import Login from '@/pages/login';
import Register from '@/pages/register';
import About from './pages/about';
import AuthorPage from './pages/author';
import Profile from '@/pages/profile';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { supabase } from '@/supabase';
import { useAuthContext } from '@/context/auth/hooks/useAuthContext';

function App() {
  const { handleSetUser } = useAuthContext();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSetUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<About />} />
            <Route path="/author/:authorId" element={<AuthorPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
