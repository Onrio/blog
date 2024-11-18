import React from 'react';
import {
  loginContainer,
  loginBox,
  loginTitle,
  loginSubtitle,
  loginLabel,
  loginInput,
  loginButton,
  loginLinks,
} from '../../utils/cva';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation('register'); // Specify the namespace

  return (
    <div
      className={loginContainer()}
      style={{ minHeight: 'calc(100vh - 70px - 64px)' }}
    >
      <div className={loginBox()}>
        <h2 className={loginTitle()}>{t('title')}</h2>
        <span className={loginSubtitle()}>{t('subtitle')}</span>
        <form className="w-full">
          <label>
            <div className={loginLabel()}>{t('nameLabel')}</div>
            <input
              className={loginInput()}
              type="text"
              placeholder={t('namePlaceholder')}
            />
          </label>
          <label>
            <div className={loginLabel()}>{t('emailLabel')}</div>
            <input
              className={loginInput()}
              type="email"
              placeholder={t('emailPlaceholder')}
            />
          </label>
          <label>
            <div className={loginLabel()}>{t('passwordLabel')}</div>
            <input className={loginInput()} type="password" />
          </label>
          <label>
            <div className={loginLabel()}>{t('confirmPasswordLabel')}</div>
            <input className={loginInput()} type="password" />
          </label>
          <button className={loginButton()}>{t('button')}</button>
        </form>
        <div className={loginLinks()}>
          <span className="text-black dark:text-gray-400">
            {t('existingAccount')}{' '}
            <Link to="/login" className="text-blue-600">
              {t('loginLink')}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
