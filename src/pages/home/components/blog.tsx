import React, { useEffect, useState } from 'react';
import placeholder from '@/assets/placeholder.svg';
import { supabase } from '@/supabase';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import qs from 'qs';
import { useDebounce } from 'use-debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

dayjs.extend(relativeTime);

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
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('blog');

  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (params.search) {
      setSearch(params.search as string);
    }
  }, [location.search]);

  useEffect(() => {
    const query = qs.stringify(
      { search: debouncedSearch },
      { addQueryPrefix: true }
    );
    navigate(query, { replace: true });

    const fetchArticles = async () => {
      try {
        let query = supabase.from('blog').select('*, profiles(username)');

        if (debouncedSearch) {
          query = query.or(
            `title_ka.ilike.%${debouncedSearch}%,title_en.ilike.%${debouncedSearch}%,description_ka.ilike.%${debouncedSearch}%,description_en.ilike.%${debouncedSearch}%`
          );
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching articles:', error.message);
        } else {
          const transformedData = (data || []).map((article: any) => {
            const createdAt = article.created_at
              ? dayjs(article.created_at)
              : dayjs();
            const now = dayjs();
            const diffInMinutes = now.diff(createdAt, 'minute');

            let timeAgo;
            if (diffInMinutes < 60) {
              timeAgo = `${diffInMinutes} ${t('minutes ago')}`;
            } else {
              const diffInHours = now.diff(createdAt, 'hour');
              timeAgo = `${diffInHours} ${t('hours ago')}`;
            }

            const title =
              i18n.language === 'ka' ? article.title_ka : article.title_en;
            const description =
              i18n.language === 'ka'
                ? article.description_ka
                : article.description_en;

            return {
              id: article.id,
              title: title || t('No Title Available'),
              author: article.profiles?.username || t('Unknown Author'),
              date: timeAgo,
              readTime: t('5 min'),
              description: description || t('No Description Available'),
              tags: [],
              image_url: article.image_url || placeholder,
            };
          });
          setArticles(transformedData);
        }
      } catch (error) {
        console.error('Unexpected error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [debouncedSearch, navigate, t, i18n.language]);

  return (
    <div className="w-full md:w-2/3">
      <div className="mb-6">
        <input
          type="text"
          placeholder={t('Search articles...')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg dark:border-[rgb(51,61,75)] dark:bg-[rgb(33,37,53)] dark:text-white"
        />
      </div>
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
          <div className="flex gap-2 text-sm text-gray-500 mb-2 dark:text-[rgb(151,155,170)]">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <p className="text-gray-600 dark:text-[rgb(151,155,170)] mb-2">
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
