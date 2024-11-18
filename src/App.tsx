import './App.css';
import { ThemeProvider } from 'next-themes';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import Login from '@/pages/login';
import Register from '@/pages/register';
function App() {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
