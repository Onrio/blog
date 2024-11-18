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

const BlogArticle = () => {
  return (
    <div className={blogArticleContainer()}>
      <div className={blogArticleBox()}>
        <div className={blogArticleImageContainer()}>
          <img
            src={placeholder}
            alt="placeholder"
            className={blogArticleImage()}
          />
        </div>
        <h3 className={blogArticleTitle()}>
          The Future of Blockchain Technology
        </h3>
        <div className={blogArticleMeta()}>
          <span>John Doe</span>
          <span>•</span>
          <span>May 15, 2023</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
        <p className={blogArticleDescription()}>
          Blockchain technology is revolutionizing various industries. From
          finance to supply chain management, its potential applications are
          vast and growing. This decentralized ledger technology offers
          unprecedented levels of transparency, security, and efficiency.
        </p>
        <div className="flex gap-2">
          <button className={blogArticleButton()}>Blockchain</button>
          <button className={blogArticleButton()}>Technology</button>
          <button className={blogArticleButton()}>Future</button>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
