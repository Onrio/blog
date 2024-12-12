import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('layout');

  return (
    <footer className="h-16 bg-[rgba(215,217,224,0.5)] dark:bg-[rgba(31,33,40,0.5)]">
      <div className="container flex items-center justify-center h-16 text-[hsl(229,10%,63%)] dark:text-[hsl(229 23% 99%)] mx-auto">
        <span>© 2023 bitBlogs. {t('rights')}.</span>
      </div>
    </footer>
  );
};

export default Footer;
