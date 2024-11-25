import Header from '@/components/Header/index';
import Footer from '@/components/Footer/index';
import { Outlet } from 'react-router-dom';
import { PageContainer } from '@/components/PageContainer';

const Layout = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </>
  );
};

export default Layout;
