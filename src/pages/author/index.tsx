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
  authorPageContainer,
  aboutAuthorCard,
  authorImageBlock,
  authorImageBig,
  authorInfo,
  authorNameText,
  aboutAuthorText,
  authorSocialMedia,
  socialMediaIcon,
  authorFollowers,
  followersColumn,
  followersIcon,
  followersText,
  authorTabCard,
  aboutCard,
  aboutCardTitle,
  aboutCardText,
  skillsTitle,
  skillsList,
  skillsItem,
  blogArticleBox,
  blogArticleImageContainer,
  blogArticleImage,
  blogArticleTitle,
  blogArticleMeta,
  blogArticleDescription,
  blogArticleButton,
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
    <div className={authorPageContainer()}>
      <div className={aboutAuthorCard()}>
        <div className={authorImageBlock()}>
          <img src={person} alt="" className={authorImageBig()} />
        </div>
        <div className={authorInfo()}>
          <h2 className={authorNameText()}>{author.name}</h2>
          <p className={aboutAuthorText()}>{author.AboutAuthor}</p>
          <div className={authorSocialMedia()}>
            <a href={author.twitter} className={socialMediaIcon()}>
              <img src={twitter} alt="twitter icon" />
            </a>
            <a href={author.facebook} className={socialMediaIcon()}>
              <img src={facebook} alt="facebook icon" />
            </a>
            <a href={author.linkedin} className={socialMediaIcon()}>
              <img src={linkedin} alt="linkedin icon" />
            </a>
            <a href={author.github} className={socialMediaIcon()}>
              <img src={github} alt="github icon" />
            </a>
          </div>
          <div className={authorFollowers()}>
            <div className={followersColumn()}>
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
      <div className={authorTabCard()}>
        <Tabs defaultValue="article" className="w-full">
          <TabsList>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            {authorArticles.length > 0 ? (
              <div className="author-articles">
                {authorArticles.map((article, index) => (
                  <div key={index} className={blogArticleBox()}>
                    <div className={blogArticleImageContainer()}>
                      <img
                        src={placeholder}
                        alt="Article"
                        className={blogArticleImage()}
                      />
                    </div>
                    <h3 className={blogArticleTitle()}>{article.title}</h3>
                    <div className={blogArticleMeta()}>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <p className={blogArticleDescription()}>
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
            <div className={aboutCard()}>
              <h3 className={aboutCardTitle()}>About {author.name}</h3>
              <p className={aboutCardText()}>{author.About}</p>
              <h4 className={skillsTitle()}>Skills</h4>
              <div className={skillsList()}>
                {author.skills.map((skill, idx) => (
                  <span key={idx} className={skillsItem()}>
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
