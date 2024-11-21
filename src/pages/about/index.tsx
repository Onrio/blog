import React from 'react';
import Mission from './components/mission';
import Offer from './components/offer';
import Story from './components/our-story';
import JoinUs from './components/join-us';

import { aboutContainer, aboutTitle, aboutSubtitle } from '@/utils/cva';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation('about');
  return (
    <div className={aboutContainer()}>
      <h1 className={aboutTitle()}>{t('maintitle')}</h1>
      <h5 className={aboutSubtitle()}>{t('subtitle')}</h5>
      <Mission />
      <Offer />
      <Story />
      <JoinUs />
    </div>
  );
};

export default About;
