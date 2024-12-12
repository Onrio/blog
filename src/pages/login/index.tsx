import React from 'react';
import { loginInput } from '../../utils/cva';
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
      className="flex justify-center items-center"
      style={{ minHeight: 'calc(100vh - 70px - 64px)' }}
    >
      <div className="w-[446px] max-h-full border border-gray-200 dark:border-[rgb(31,41,55)] rounded-[12px] shadow-[rgba(0,0,0,0.1)_0px_1px_2px_0px] p-6 flex flex-col items-center">
        <h2 className="font-bold text-2xl mb-2 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]">
          {t('title')}
        </h2>
        <span className="font-bold text-2xl mb-2 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]">
          {t('subtitle')}
        </span>

        <form className="w-full" onSubmit={handleSubmit(onLoginSubmit)}>
          <label>
            <div className="text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)] text-[14px] mb-2">
              {t('emailLabel')}
            </div>
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
            <div className="text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)] text-[14px] mb-2">
              {t('passwordLabel')}
            </div>
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
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('loading') : t('button')}
          </button>
        </form>

        <div className="w-full flex justify-between mt-4 text-sm text-blue-600 dark:text-blue-400">
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
