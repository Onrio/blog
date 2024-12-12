import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '@/assets/placeholder.svg';
import { useTranslation } from 'react-i18next';
import { sidebarBox, title } from '@/utils/cva';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { authors } from '@/i18n/English/authors.json';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const articles = t('articles', { ns: 'articles', returnObjects: true }) as {
    title: string;
    author: string;
    date: string;
    readTime: string;
    description: string;
    tags: string[];
  }[];

  const uniqueTags = articles
    .flatMap((article) => article.tags)
    .filter((tag, index, self) => self.indexOf(tag) === index);

  return (
    <div className="md:w-1/3">
      <div className={sidebarBox()}>
        <h4 className={title()}>Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {uniqueTags.map((tag, index) => (
            <Badge key={index} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className={sidebarBox()}>
        <h4 className={title()}>Featured Authors</h4>
        <div className="flex flex-col gap-4">
          {authors.map((author, index) => (
            <Link
              to={`/author/${encodeURIComponent(author.id)}`}
              key={index}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src={placeholder} alt={author.name} />
                </Avatar>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]">
                  {author.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-[rgb(151,155,170)]">
                  {author.proffesion}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
