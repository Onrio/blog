import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { registerUser } from '@/supabase/register'; // import registerUser function
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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

  // useMutation hook to handle user registration
  const registerMutation = useMutation(registerUser, {
    onSuccess: () => {
      alert(t('registrationSuccess'));
    },
    onError: (error: Error) => {
      alert(error.message); // display error message if registration fails
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert(t('passwordMismatch'));
      return;
    }

    // Call registerUser with form data
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">{t('step1Title')}</h2>
            <form>
              <Input
                className="mb-4"
                type="text"
                name="name"
                placeholder={t('namePlaceholder')}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                className="mb-4"
                type="text"
                name="georgianName"
                placeholder={t('georgianNamePlaceholder')}
                value={formData.georgianName}
                onChange={handleInputChange}
                required
              />
              <Input
                className="mb-4"
                type="email"
                name="email"
                placeholder={t('emailPlaceholder')}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                className="mb-4"
                type="password"
                name="password"
                placeholder={t('passwordPlaceholder')}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Input
                className="mb-4"
                type="password"
                name="confirmPassword"
                placeholder={t('confirmPasswordPlaceholder')}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
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
            <Button
              variant="outline"
              type="button"
              className="mb-4"
              onClick={() => setStep(1)}
            >
              {t('previous')}
            </Button>
            <h2 className="text-xl font-semibold mb-4">{t('step2Title')}</h2>
            <form>
              <Input
                className="mb-4"
                type="text"
                name="mobile"
                placeholder={t('mobilePlaceholder')}
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
              <Input
                className="mb-4"
                type="text"
                name="twitter"
                placeholder={t('twitterPlaceholder')}
                value={formData.twitter}
                onChange={handleInputChange}
              />
              <Input
                className="mb-4"
                type="text"
                name="facebook"
                placeholder={t('facebookPlaceholder')}
                value={formData.facebook}
                onChange={handleInputChange}
              />
              <Input
                className="mb-4"
                type="text"
                name="linkedin"
                placeholder={t('linkedinPlaceholder')}
                value={formData.linkedin}
                onChange={handleInputChange}
              />
              <Input
                className="mb-4"
                type="text"
                name="github"
                placeholder={t('githubPlaceholder')}
                value={formData.github}
                onChange={handleInputChange}
              />
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
            <Button
              variant="outline"
              type="button"
              className="mb-4"
              onClick={() => setStep(2)}
            >
              {t('previous')}
            </Button>
            <h2 className="text-xl font-semibold mb-4">{t('step3Title')}</h2>
            <form onSubmit={handleSubmit}>
              <Textarea
                className="mb-4"
                name="about"
                placeholder={t('aboutPlaceholder')}
                value={formData.about}
                onChange={handleInputChange}
                required
              />
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
