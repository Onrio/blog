import React from 'react';
import Mission from './components/mission';
import Offer from './components/offer';
import Story from './components/our-story';
import JoinUs from './components/join-us';

import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation('about');
  return (
    <div className="container max-w-4xl mx-auto p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]">
        {t('maintitle')}
      </h1>
      <h5 className="text-lg mb-6 text-[rgb(85,88,104)] dark:text-[rgb(151,155,170)]">
        {t('subtitle')}
      </h5>
      <Mission />
      <Offer />
      <Story />
      <JoinUs />
    </div>
  );
};

export default About;
