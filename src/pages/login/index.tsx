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

const Login: React.FC = () => {
  const { t } = useTranslation('login');

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
            <div className={loginLabel()}>{t('emailLabel')}</div>
            <input
              className={loginInput()}
              type="email"
              placeholder="name@example.com"
            />
          </label>
          <label>
            <div className={loginLabel()}>{t('passwordLabel')}</div>
            <input className={loginInput()} type="password" />
          </label>
          <button className={loginButton()}>{t('button')}</button>
        </form>
        <div className={loginLinks()}>
          <a href="">{t('forgotPassword')}</a>
          <span className="text-black dark:text-gray-400">
            {t('noAccount')}{' '}
            <Link to="/register" className="text-blue-600">
              {t('signUp')}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
