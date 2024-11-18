import React from 'react';
import placeholder from '@/assets/placeholder.svg';
import {
  sidebarContainer,
  sidebarBox,
  title,
  tagButton,
  authorContainer,
  authorItem,
  authorImageContainer,
  authorImage,
  authorName,
  authorDescription,
} from '@/utils/cva';

const Sidebar: React.FC = () => {
  return (
    <div className={sidebarContainer()}>
      <div className={sidebarBox()}>
        <h4 className={title()}>Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          <button className={tagButton()}>Blockchain</button>
          <button className={tagButton()}>Cryptocurrency</button>
          <button className={tagButton()}>Technology</button>
          <button className={tagButton()}>Programming</button>
          <button className={tagButton()}>AI</button>
          <button className={tagButton()}>Machine Learning</button>
        </div>
      </div>
      <div className={sidebarBox()}>
        <h4 className={title()}>Featured Authors</h4>
        <div className={authorContainer()}>
          <div className={authorItem()}>
            <div className={authorImageContainer()}>
              <img src={placeholder} alt="Author" className={authorImage()} />
            </div>
            <div>
              <h5 className={authorName()}>John Doe</h5>
              <span className={authorDescription()}>Blockchain Enthusiast</span>
            </div>
          </div>
          <div className={authorItem()}>
            <div className={authorImageContainer()}>
              <img src={placeholder} alt="Author" className={authorImage()} />
            </div>
            <div>
              <h5 className={authorName()}>Bob Smith</h5>
              <span className={authorDescription()}>Crypto Analyst</span>
            </div>
          </div>
          <div className={authorItem()}>
            <div className={authorImageContainer()}>
              <img src={placeholder} alt="Author" className={authorImage()} />
            </div>
            <div>
              <h5 className={authorName()}>Alice Brown</h5>
              <span className={authorDescription()}>Tech Innovator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
