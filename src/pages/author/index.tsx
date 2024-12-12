import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import person from '@/assets/person.png';
import twitter from '@/assets/svg/twitter.svg';
import facebook from '@/assets/svg/facebook.svg';
import linkedin from '@/assets/svg/linkedin.svg';
import github from '@/assets/svg/github.svg';
import follower from '@/assets/svg/followers.svg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import placeholder from '@/assets/placeholder.svg';
import {
  socialMediaIcon,
  followersColumn,
  followersIcon,
  followersText,
} from '@/utils/cva';

const Author: React.FC = () => {
  const { t } = useTranslation('autors');
  const { authorId } = useParams<{ authorId: string }>();

  const authors = (t('authors', { returnObjects: true }) || []) as {
    id: string;
    name: string;
    AboutAuthor: string;
    proffesion: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    github: string;
    follower: number;
    following: number;
    About: string;
    skills: string[];
  }[];

  const articles = (t('articles', { ns: 'articles', returnObjects: true }) ||
    []) as {
    id: string;
    title: string;
    author: string;
    date: string;
    readTime: string;
    description: string;
    tags: string[];
  }[];

  const authorNameMapping = authors.reduce(
    (acc, author) => {
      acc[author.id] = author;
      return acc;
    },
    {} as { [key: string]: (typeof authors)[0] }
  );

  const author = authorId ? authorNameMapping[authorId] : undefined;

  const authorArticles = articles.filter(
    (article) => article.id === author?.id
  );

  if (!author) {
    return <p>author not found</p>;
  }

  return (
    <div className="max-w-full px-4 py-8 flex flex-col items-center">
      <div className="mb-12 p-8 shadow-lg max-w-4xl flex gap-8 w-full">
        <div className="w-[120px] h-[120px] rounded-full border-4 border-blue-500 overflow-hidden">
          <img src={person} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col flex-1">
          <h2 className="text-3xl font-bold mb-2">{author.name}</h2>
          <p className="text-base mb-4 text-gray-600 dark:text-gray-300">
            {author.AboutAuthor}
          </p>
          <div className="flex gap-4 mb-4">
            <a href={author.twitter} className={socialMediaIcon()}>
              <img src={twitter} alt="twitter icon" className="w-4 h-4" />
            </a>
            <a href={author.facebook} className={socialMediaIcon()}>
              <img src={facebook} alt="facebook icon" className="w-4 h-4" />
            </a>
            <a href={author.linkedin} className={socialMediaIcon()}>
              <img src={linkedin} alt="linkedin icon" className="w-4 h-4" />
            </a>
            <a href={author.github} className={socialMediaIcon()}>
              <img src={github} alt="github icon" className="w-4 h-4" />
            </a>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <img
                src={follower}
                alt="followers icon"
                className={followersIcon()}
              />
              <span className={followersText()}>
                {author.follower} Followers
              </span>
            </div>
            <div className={followersColumn()}>
              <img
                src={follower}
                alt="followers icon"
                className={followersIcon()}
              />
              <span className={followersText()}>
                {author.following} Following
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl w-full">
        <Tabs defaultValue="article" className="w-full">
          <TabsList>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            {authorArticles.length > 0 ? (
              <div className="author-articles">
                {authorArticles.map((article, index) => (
                  <div
                    key={index}
                    className="w-full p-6 border border-gray-300 rounded-lg shadow-md dark:border-[rgb(51,61,75)] mb-8"
                  >
                    <div className="h-52 overflow-hidden rounded-lg mb-4">
                      <img
                        src={placeholder}
                        alt="Article"
                        className="w-full h-full object-cover mb-4"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]">
                      {article.title}
                    </h3>
                    <div className="flex gap-2 text-sm text-gray-500 mb-6 dark:text-[rgb(151,155,170)]">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <p className="text-gray-600 mb-6 dark:text-[rgb(151,155,170)]">
                      {article.description}
                    </p>
                    <div className="flex gap-2">
                      {article.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Article not found</p>
            )}
          </TabsContent>
          <TabsContent value="about">
            <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                About {author.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {author.About}
              </p>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Skills
              </h4>
              <div className="flex gap-3">
                {author.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Author;
