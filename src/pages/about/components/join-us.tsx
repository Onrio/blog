import React from 'react';
import { Link } from 'react-router-dom';
import { ourMissionArticleH2 } from '@/utils/cva';
import { useTranslation } from 'react-i18next';
import { buttonVariants } from '@/components/ui/button';

const JoinUs: React.FC = () => {
  const { t } = useTranslation('about');

  return (
    <div className="w-full flex flex-col items-center gap-6 mb-12">
      <h2 className={ourMissionArticleH2()}>{t('join.title')}</h2>
      <p className="text-[16px] text-[rgb(85,88,104)] dark:text-[rgb(151,155,170)] text-center">
        {t('join.description')}
      </p>
      <Link to="/register" className={buttonVariants({ variant: 'default' })}>
        <button>{t('join.button')}</button>
      </Link>
    </div>
  );
};

export default JoinUs;
