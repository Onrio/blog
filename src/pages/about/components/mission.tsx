import React from 'react';
import placeholder from '@/assets/placeholder.svg';
import { useTranslation } from 'react-i18next';

const Mission: React.FC = () => {
  const { t } = useTranslation('about');
  return (
    <div className="flex mt-12 flex-1 gap-9 mb-12">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)] mb-2 font-semibold">
          {t('articletitle')}
        </h2>
        <p className="text-[16px] text-[rgb(85,88,104)] dark:text-[rgb(151,155,170)]">
          {t('article')}
        </p>
      </div>
      <div className="flex flex-1 overflow-hidden rounded-[8px]">
        <img src={placeholder} alt="placeholder image" />
      </div>
    </div>
  );
};

export default Mission;
