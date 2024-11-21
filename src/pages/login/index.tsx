import React, { useState } from 'react';
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
import { login } from '@/supabase/auth/index';

const Login: React.FC = () => {
  const { t } = useTranslation('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const { error } = await login({ email, password });

      if (error) {
        setError(error.message);
      } else {
        alert(t('loginSuccess'));
      }
    } catch (error) {
      setError(t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={loginContainer()}
      style={{ minHeight: 'calc(100vh - 70px - 64px)' }}
    >
      <div className={loginBox()}>
        <h2 className={loginTitle()}>{t('title')}</h2>
        <span className={loginSubtitle()}>{t('subtitle')}</span>

        {/* Login Form */}
        <form className="w-full" onSubmit={handleSubmit}>
          <label>
            <div className={loginLabel()}>{t('emailLabel')}</div>
            <input
              className={loginInput()}
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label>
            <div className={loginLabel()}>{t('passwordLabel')}</div>
            <input
              className={loginInput()}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>

          {/* Show loading spinner if form is submitting */}
          <button className={loginButton()} type="submit" disabled={loading}>
            {loading ? t('loading') : t('button')}
          </button>

          {/* Show error message */}
          {error && <p className="text-red-500">{error}</p>}
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
