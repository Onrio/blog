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
import { useForm } from 'react-hook-form';
import { login } from '@/supabase/auth/index';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { t } = useTranslation('login');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: any) => {
      console.error('Login failed:', error.message);
      alert(t('loginError'));
    },
  });

  const onLoginSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data);
  };

  return (
    <div
      className={loginContainer()}
      style={{ minHeight: 'calc(100vh - 70px - 64px)' }}
    >
      <div className={loginBox()}>
        <h2 className={loginTitle()}>{t('title')}</h2>
        <span className={loginSubtitle()}>{t('subtitle')}</span>

        <form className="w-full" onSubmit={handleSubmit(onLoginSubmit)}>
          <label>
            <div className={loginLabel()}>{t('emailLabel')}</div>
            <input
              className={loginInput()}
              type="email"
              placeholder="name@example.com"
              {...register('email', {
                required: t('emailRequired') as string,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('emailInvalid') as string,
                },
              })}
              onBlur={() => trigger('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </p>
            )}
          </label>
          <label>
            <div className={loginLabel()}>{t('passwordLabel')}</div>
            <input
              className={loginInput()}
              type="password"
              {...register('password', {
                required: t('passwordRequired') as string,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}
          </label>

          <button
            className={loginButton()}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('loading') : t('button')}
          </button>
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
