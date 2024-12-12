import React from 'react';
import { ourMissionArticleH2 } from '@/utils/cva';
import { useTranslation } from 'react-i18next';

const OurStory: React.FC = () => {
  const { t } = useTranslation('about');

  return (
    <div className="w-full mb-12 rounded-[8px] bg-[rgb(215,217,224)] dark:bg-[rgb(31,33,40)] p-8">
      <h2 className={ourMissionArticleH2()}>{t('story.title')}</h2>
      <p className="text-[16px] text-[rgb(85,88,104)] dark:text-[rgb(151,155,170)]">
        {t('story.content')}
      </p>
    </div>
  );
};

export default OurStory;
