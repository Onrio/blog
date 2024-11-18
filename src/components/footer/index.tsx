import React from 'react';
import { useTranslation } from 'react-i18next';

import { footerContainer, footer } from '@/utils/cva';

const Footer: React.FC = () => {
  const { t } = useTranslation('layout');

  return (
    <footer className={footer()}>
      <div className={footerContainer()}>
        <span>© 2023 bitBlogs. {t('rights')}.</span>
      </div>
    </footer>
  );
};

export default Footer;
