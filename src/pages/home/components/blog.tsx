import React from 'react';
import placeholder from '@/assets/placeholder.svg';
import {
  blogArticleContainer,
  blogArticleBox,
  blogArticleImageContainer,
  blogArticleImage,
  blogArticleTitle,
  blogArticleMeta,
  blogArticleDescription,
  blogArticleButton,
} from '@/utils/cva';
import { useTranslation } from 'react-i18next';

const BlogArticle: React.FC = () => {
  const { t } = useTranslation();

  const articles = t('articles', { ns: 'articles', returnObjects: true }) as {
    title: string;
    author: string;
    date: string;
    readTime: string;
    description: string;
    tags: string[];
  }[];

  return (
    <div className={blogArticleContainer()}>
      {articles.map((article, index) => (
        <div key={index} className={blogArticleBox()}>
          <div className={blogArticleImageContainer()}>
            <img
              src={placeholder}
              alt="placeholder"
              className={blogArticleImage()}
            />
          </div>
          <h3 className={blogArticleTitle()}>{article.title}</h3>
          <div className={blogArticleMeta()}>
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <p className={blogArticleDescription()}>{article.description}</p>
          <div className="flex gap-2">
            {article.tags.map((tag, tagIndex) => (
              <button key={tagIndex} className={blogArticleButton()}>
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
