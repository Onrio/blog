import React, { useEffect, useState } from 'react';
import placeholder from '@/assets/placeholder.svg';
import { supabase } from '@/supabase';

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  description: string;
  tags: string[];
  image_url: string;
}

const BlogArticle: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase.from('blog').select('*');
        if (error) {
          console.error('Error fetching articles:', error.message);
        } else {
          const transformedData = (data || []).map((article: any) => ({
            id: article.id,
            title: article.title_en || article.title_ka,
            author: article.user_id,
            date: article.created_at || '',
            readTime: '5 min',
            description: article.description_en || article.description_ka,
            tags: [],
            image_url: article.image_url || placeholder,
          }));
          setArticles(transformedData);
        }
      } catch (error) {
        console.error('Unexpected error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="w-full md:w-2/3">
      {articles.map((article) => (
        <div
          key={article.id}
          className="w-full p-6 border border-gray-300 rounded-lg shadow-md dark:border-[rgb(51,61,75)] mb-8"
        >
          <div className="h-52 overflow-hidden rounded-lg mb-4">
            <img
              src={article.image_url || placeholder}
              alt={article.title}
              className="w-full h-full object-cover mb-4"
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]">
            {article.title}
          </h3>
          <div className="flex gap-2 text-sm text-gray-500 mb-6 dark:text-[rgb(151,155,170)]">
            {/* <span>{article.author}</span> */}
            {/* <span>•</span>
            <span>{article.date}</span>
            <span>•</span> */}
            <span>{article.readTime}</span>
          </div>
          <p className="text-gray-600 mb-6 dark:text-[rgb(151,155,170)]">
            {article.description}
          </p>
          <div className="flex gap-2">
            {article.tags.map((tag, tagIndex) => (
              <button
                key={tagIndex}
                className="px-3 py-1 text-sm text-[hsl(229,20%,30%)] bg-blue-100 rounded dark:bg-[rgb(33,37,53)] dark:text-[rgb(255,255,255)]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogArticle;
