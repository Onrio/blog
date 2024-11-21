import React from 'react';
import {
  ourMission,
  ourMissionArticle,
  ourMissionImg,
  ourMissionArticleH2,
  ourMissionArticlep,
} from '@/utils/cva';
import placeholder from '@/assets/placeholder.svg';
import { useTranslation } from 'react-i18next';

const Mission: React.FC = () => {
  const { t } = useTranslation('about');
  return (
    <div className={ourMission()}>
      <div className={ourMissionArticle()}>
        <h2 className={ourMissionArticleH2()}>{t('articletitle')}</h2>
        <p className={ourMissionArticlep()}>{t('article')}</p>
      </div>
      <div className={ourMissionImg()}>
        <img src={placeholder} alt="placeholder image" />
      </div>
    </div>
  );
};

export default Mission;
