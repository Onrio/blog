import React from 'react';
import { storyBlock, ourMissionArticleH2, storytext } from '@/utils/cva';
import { useTranslation } from 'react-i18next';

const OurStory: React.FC = () => {
  const { t } = useTranslation('about');

  return (
    <div className={storyBlock()}>
      <h2 className={ourMissionArticleH2()}>{t('story.title')}</h2>
      <p className={storytext()}>{t('story.content')}</p>
    </div>
  );
};

export default OurStory;
