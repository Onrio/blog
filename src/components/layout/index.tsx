import Header from '@/components/header/index';
import Footer from '@/components/footer/index';
import { Outlet } from 'react-router-dom';
import { PageContainer } from '@/components/page-container/page-container';

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
