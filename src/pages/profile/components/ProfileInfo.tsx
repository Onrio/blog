import React, { useState } from 'react';
import {
  socialMediaIcon,
  followersColumn,
  followersIcon,
  followersText,
} from '@/utils/cva';
import twitter from '@/assets/svg/twitter.svg';
import facebook from '@/assets/svg/facebook.svg';
import linkedin from '@/assets/svg/linkedin.svg';
import github from '@/assets/svg/github.svg';
import follower from '@/assets/svg/followers.svg';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { UseFormRegister, FieldErrors, UseFormTrigger } from 'react-hook-form';

export type ProfileInputs = {
  name: string;
  georgianName: string;
  about: string;
};

type ProfileInfoProps = {
  profile: {
    username?: string | null;
    about?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    linkedin?: string | null;
    github?: string | null;
  };
  avatarSrc: string | null;
  onSubmit: (
    data: ProfileInputs,
    event?: React.BaseSyntheticEvent
  ) => Promise<void>;
  isSubmitting: boolean;
  register: UseFormRegister<ProfileInputs>;
  errors: FieldErrors<ProfileInputs>;
  trigger: UseFormTrigger<ProfileInputs>;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  avatarSrc,
  onSubmit,
  isSubmitting,
  register,
  errors,
  trigger,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit({
      name: formData.get('name') as string,
      georgianName: formData.get('georgianName') as string,
      about: formData.get('about') as string,
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="mb-12 p-8 shadow-lg max-w-4xl flex gap-8 w-full">
      <div className="w-[120px] h-[120px] rounded-full border-4 border-blue-500 overflow-hidden">
        <img
          src={avatarSrc || '/default-avatar.png'}
          alt="Author avatar"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold mb-2">
            {profile.username || 'Anonymous'}
          </h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Your Profile</DialogTitle>
                <DialogDescription>
                  Please update your profile details below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <Label htmlFor="name">Edit Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  onBlur={() => trigger('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                <Label htmlFor="georgianName">Edit Georgian Name</Label>
                <Input
                  id="georgianName"
                  type="text"
                  {...register('georgianName', {
                    required: 'Georgian name is required',
                  })}
                  onBlur={() => trigger('georgianName')}
                />
                {errors.georgianName && (
                  <p className="text-red-500 text-sm">
                    {errors.georgianName.message}
                  </p>
                )}

                <Label htmlFor="about">Edit About</Label>
                <Textarea
                  id="about"
                  {...register('about', {
                    required: 'About is required',
                    maxLength: {
                      value: 200,
                      message: 'About is too long',
                    },
                  })}
                  onBlur={() => trigger('about')}
                />
                {errors.about && (
                  <p className="text-red-500 text-sm">{errors.about.message}</p>
                )}

                <Button
                  className="w-full mt-4"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-base mb-4 text-gray-600 dark:text-gray-300">
          {profile.about || 'No bio available.'}
        </p>

        <div className="flex gap-4 mb-4">
          {profile.twitter && (
            <a
              href={profile.twitter}
              className={socialMediaIcon()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="Twitter icon" className="w-4 h-4" />
            </a>
          )}
          {profile.facebook && (
            <a
              href={profile.facebook}
              className={socialMediaIcon()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook icon" className="w-4 h-4" />
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              className={socialMediaIcon()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn icon" className="w-4 h-4" />
            </a>
          )}
          {profile.github && (
            <a
              href={profile.github}
              className={socialMediaIcon()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="GitHub icon" className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex gap-4">
          <div className={followersColumn()}>
            <img
              src={follower}
              alt="Followers icon"
              className={followersIcon()}
            />
            <span className={followersText()}>0 Followers</span>
          </div>
          <div className={followersColumn()}>
            <img
              src={follower}
              alt="Following icon"
              className={followersIcon()}
            />
            <span className={followersText()}>0 Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
