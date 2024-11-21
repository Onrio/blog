import React from 'react';
import { Link } from 'react-router-dom';
import { joinUsContainer, ourMissionArticleH2, joinUsText } from '@/utils/cva';
import { useTranslation } from 'react-i18next';
import { buttonVariants } from '@/components/ui/button';

const JoinUs: React.FC = () => {
  const { t } = useTranslation('about');

  return (
    <div className={joinUsContainer()}>
      <h2 className={ourMissionArticleH2()}>{t('join.title')}</h2>
      <p className={joinUsText()}>{t('join.description')}</p>
      <Link to="/register" className={buttonVariants({ variant: 'default' })}>
        <button>{t('join.button')}</button>
      </Link>
    </div>
  );
};

export default JoinUs;
