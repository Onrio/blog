import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { registerUser } from '@/supabase/register';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Register: React.FC = () => {
  const { t } = useTranslation('register');

  const [formData, setFormData] = useState({
    name: '',
    georgianName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    github: '',
    about: '',
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerMutation = useMutation(registerUser, {
    onSuccess: () => {
      alert(t('registrationSuccess'));
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert(t('passwordMismatch'));
      return;
    }

    registerMutation.mutate({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      georgianName: formData.georgianName,
      mobile: formData.mobile,
      twitter: formData.twitter,
      facebook: formData.facebook,
      linkedin: formData.linkedin,
      github: formData.github,
      about: formData.about,
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="georgianName">{t('georgianNameLabel')}</Label>
                <Input
                  id="georgianName"
                  type="text"
                  name="georgianName"
                  value={formData.georgianName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="email">{t('emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="password">{t('passwordLabel')}</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="confirmPassword">
                  {t('confirmPasswordLabel')}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
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
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="twitter">{t('twitterLabel')}</Label>
                <Input
                  id="twitter"
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="facebook">{t('facebookLabel')}</Label>
                <Input
                  id="facebook"
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="linkedin">{t('linkedinLabel')}</Label>
                <Input
                  id="linkedin"
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="github">{t('githubLabel')}</Label>
                <Input
                  id="github"
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                />
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
              <Button variant="ghost" type="button" onClick={() => setStep(2)}>
                {t('previous')}
              </Button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="about">{t('aboutLabel')}</Label>
                <Textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={registerMutation.isLoading}
              >
                {registerMutation.isLoading ? t('loading') : t('submit')}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
