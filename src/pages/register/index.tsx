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
import { useMutation } from 'react-query';
import { registerUser } from '@/supabase/register';

const Register: React.FC = () => {
  const { t } = useTranslation('register');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerMutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const user = await registerUser({ email, password });

        return user;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error(String(error));
        }
      }
    },
    {
      onSuccess: () => {
        alert(t('registrationSuccess'));
      },
      onError: (error: Error) => {
        alert(error.message);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert(t('passwordMismatch'));
      return;
    }

    registerMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div
      className={loginContainer()}
      style={{ minHeight: 'calc(100vh - 70px - 64px)' }}
    >
      <div className={loginBox()}>
        <h2 className={loginTitle()}>{t('title')}</h2>
        <span className={loginSubtitle()}>{t('subtitle')}</span>
        <form className="w-full" onSubmit={handleSubmit}>
          <label>
            <div className={loginLabel()}>{t('nameLabel')}</div>
            <input
              className={loginInput()}
              type="text"
              name="name"
              placeholder={t('namePlaceholder')}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <div className={loginLabel()}>{t('emailLabel')}</div>
            <input
              className={loginInput()}
              type="email"
              name="email"
              placeholder={t('emailPlaceholder')}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <div className={loginLabel()}>{t('passwordLabel')}</div>
            <input
              className={loginInput()}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <div className={loginLabel()}>{t('confirmPasswordLabel')}</div>
            <input
              className={loginInput()}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </label>
          <button
            className={loginButton()}
            type="submit"
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? t('loading') : t('button')}
          </button>
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
