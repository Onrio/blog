import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { registerUser } from '@/supabase/register';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface LoginFormInputs {
  email: string;
  password: string;
  name: string;
  georgianName: string;
  confirmPassword: string;
  mobile?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  about?: string;
}

const Register: React.FC = () => {
  const { t } = useTranslation('register');
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const registerMutation = useMutation(registerUser, {
    onSuccess: () => {
      alert(t('registrationSuccess'));
      navigate('/');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const password = watch('password');

  const handleRegistrationSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      alert(t('passwordMismatch'));
      return;
    }

    registerMutation.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
      georgianName: data.georgianName,
      mobile: data.mobile,
      twitter: data.twitter,
      facebook: data.facebook,
      linkedin: data.linkedin,
      github: data.github,
      about: data.about,
      navigate,
    });
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: 'calc(100vh - 70px - 70px)' }}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">{t('step1Title')}</h2>
            <form>
              <div className="mb-4">
                <Label htmlFor="name">{t('nameLabel')}</Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: t('nameRequired'),
                    minLength: { value: 3, message: t('nameMin') },
                    maxLength: { value: 16, message: t('nameMax') },
                  })}
                  onBlur={() => trigger('name')}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="georgianName">{t('georgianNameLabel')}</Label>
                <Input
                  id="georgianName"
                  type="text"
                  {...register('georgianName', {
                    required: t('georgianNameRequired'),
                    minLength: { value: 3, message: t('georgianNameMin') },
                    maxLength: { value: 16, message: t('georgianNameMax') },
                    pattern: {
                      value: /^[ა-ჰ]+$/,
                      message: t('georgianNameInvalid'),
                    },
                  })}
                  onBlur={() => trigger('georgianName')}
                />
                {errors.georgianName && (
                  <p className="text-red-500">{errors.georgianName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="email">{t('emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: t('emailRequired'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('emailInvalid'),
                    },
                  })}
                  onBlur={() => trigger('email')}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="password">{t('passwordLabel')}</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: t('passwordRequired'),
                    minLength: { value: 6, message: t('passwordMin') },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).{6,16}$/,
                      message: t('passwordInvalid'),
                    },
                  })}
                  onBlur={() => trigger('password')}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="confirmPassword">
                  {t('confirmPasswordLabel')}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: t('confirmPasswordRequired'),
                    validate: (value) =>
                      value === password || t('passwordMismatch'),
                  })}
                  onBlur={() => trigger('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button
                className="w-full"
                type="button"
                onClick={() => setStep(2)}
              >
                {t('next')}
              </Button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{t('step2Title')}</h2>
              <Button
                variant="ghost"
                type="button"
                className="p-0"
                onClick={() => setStep(1)}
              >
                {t('previous')}
              </Button>
            </div>
            <form>
              <div className="mb-4">
                <Label htmlFor="mobile">{t('mobileLabel')}</Label>
                <Input
                  id="mobile"
                  type="text"
                  {...register('mobile', {
                    required: t('mobileRequired'),
                    minLength: { value: 9, message: t('mobileMin') },
                    pattern: { value: /^\d+$/, message: t('mobileInvalid') },
                  })}
                  onBlur={() => trigger('mobile')}
                />
                {errors.mobile && (
                  <p className="text-red-500">{errors.mobile.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="twitter">{t('twitterLabel')}</Label>
                <Input
                  id="twitter"
                  type="text"
                  {...register('twitter', {
                    pattern: {
                      value: /twitter/i,
                      message: t('twitterInvalid'),
                    },
                  })}
                  onBlur={() => trigger('twitter')}
                />
                {errors.twitter && (
                  <p className="text-red-500">{errors.twitter.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="facebook">{t('facebookLabel')}</Label>
                <Input
                  id="facebook"
                  type="text"
                  {...register('facebook', {
                    pattern: {
                      value: /facebook/i,
                      message: t('facebookInvalid'),
                    },
                  })}
                  onBlur={() => trigger('facebook')}
                />
                {errors.facebook && (
                  <p className="text-red-500">{errors.facebook.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="linkedin">{t('linkedinLabel')}</Label>
                <Input
                  id="linkedin"
                  type="text"
                  {...register('linkedin', {
                    pattern: {
                      value: /linkedin/i,
                      message: t('linkedinInvalid'),
                    },
                  })}
                  onBlur={() => trigger('linkedin')}
                />
                {errors.linkedin && (
                  <p className="text-red-500">{errors.linkedin.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="github">{t('githubLabel')}</Label>
                <Input
                  id="github"
                  type="text"
                  {...register('github', {
                    pattern: {
                      value: /github/i,
                      message: t('githubInvalid'),
                    },
                  })}
                  onBlur={() => trigger('github')}
                />
                {errors.github && (
                  <p className="text-red-500">{errors.github.message}</p>
                )}
              </div>
              <Button
                className="w-full"
                type="button"
                onClick={() => setStep(3)}
              >
                {t('next')}
              </Button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{t('step3Title')}</h2>
              <Button
                variant="ghost"
                type="button"
                className="p-0"
                onClick={() => setStep(2)}
              >
                {t('previous')}
              </Button>
            </div>
            <form onSubmit={handleSubmit(handleRegistrationSubmit)}>
              <div className="mb-4">
                <Label htmlFor="about">{t('aboutLabel')}</Label>
                <Textarea
                  id="about"
                  {...register('about')}
                  onBlur={() => trigger('about')}
                />
              </div>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {t('submit')}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
