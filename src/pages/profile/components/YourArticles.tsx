import React from 'react';
import { useTranslation } from 'react-i18next';

interface Blog {
  id: string;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image_url: string;
}

const YourArticles: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  const { i18n } = useTranslation();

  return (
    <div className="author-articles">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="w-full p-6 border border-gray-300 rounded-lg shadow-md dark:border-[rgb(51,61,75)] mb-8"
        >
          <div className="h-52 overflow-hidden rounded-lg mb-4">
            <img
              src={blog.image_url}
              alt={i18n.language === 'ka' ? blog.title_ka : blog.title_en}
              className="w-full h-full object-cover mb-4"
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]">
            {i18n.language === 'ka' ? blog.title_ka : blog.title_en}
          </h3>
          <div className="flex gap-2 text-sm text-gray-500 mb-6 dark:text-[rgb(151,155,170)]">
            <span>
              {i18n.language === 'ka'
                ? blog.description_ka
                : blog.description_en}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourArticles;
