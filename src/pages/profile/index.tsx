import React from 'react';
import {
  authorPageContainer,
  //   aboutAuthorCard,
  //   authorImageBlock,
  //   authorImageBig,
  //   authorInfo,
  //   authorNameText,
  //   aboutAuthorText,
  //   authorSocialMedia,
  //   socialMediaIcon,
  //   authorFollowers,
  //   followersColumn,
  //   followersIcon,
  //   followersText,
} from '@/utils/cva';
const Profile: React.FC = () => {
  return (
    <div className={authorPageContainer()}>
      {/* <div className={aboutAuthorCard()}>
        <div className={authorImageBlock()}>
          <img src={"person"} alt="" className={authorImageBig()} />
        </div>
        <div className={authorInfo()}>
          <h2 className={authorNameText()}>{author.name}</h2>
          <p className={aboutAuthorText()}>{author.AboutAuthor}</p>
          <div className={authorSocialMedia()}>
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
      </div> */}
    </div>
  );
};

export default Profile;
