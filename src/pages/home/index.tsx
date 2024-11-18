import React from 'react';
import BlogArticle from './components/blog';
import Sidebar from './components/sidebar';
const Home: React.FC = () => {
  return (
    <div className="container flex m-auto gap-8 pt-8">
      <BlogArticle />
      <Sidebar />
    </div>
  );
};

export default Home;
