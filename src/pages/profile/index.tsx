import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/supabase';
import twitter from '@/assets/svg/twitter.svg';
import facebook from '@/assets/svg/facebook.svg';
import linkedin from '@/assets/svg/linkedin.svg';
import github from '@/assets/svg/github.svg';
import follower from '@/assets/svg/followers.svg';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useTranslation } from 'react-i18next';
import {
  authorPageContainer,
  aboutAuthorCard,
  authorImageBlock,
  authorImageBig,
  authorInfo,
  authorNameText,
  aboutAuthorText,
  authorSocialMedia,
  socialMediaIcon,
  authorFollowers,
  followersColumn,
  followersIcon,
  followersText,
} from '@/utils/cva';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Database } from '@/supabase/supabase.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileInputs {
  name: string;
  georgianName: string;
  about: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    reset,
  } = useForm<ProfileInputs>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.error('No user logged in.');
          return;
        }

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
        } else {
          setProfile(profileData);

          reset({
            name: profileData.username || '',
            georgianName: profileData.georgian_name || '',
            about: profileData.about || '',
          });
        }

        const avatar = createAvatar(avataaars, {
          seed: user.id || 'default-seed',
          backgroundColor: ['F5F5F5'],
          radius: 50,
        });

        const avatarSVG = avatar.toString();
        const base64Avatar = `data:image/svg+xml;base64,${btoa(
          unescape(encodeURIComponent(avatarSVG))
        )}`;
        setAvatarSrc(base64Avatar);
      } catch (error: any) {
        console.error('Error retrieving profile:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileInputs) => {
    try {
      if (!profile) return;

      const updates = {
        username: data.name,
        georgian_name: data.georgianName,
        about: data.about,
        mobile: profile.mobile || null,
        twitter: profile.twitter || null,
        facebook: profile.facebook || null,
        linkedin: profile.linkedin || null,
        github: profile.github || null,
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id);

      if (error) {
        console.error('Error updating profile:', error.message);
        return;
      }

      setProfile((prev: any) => ({
        ...prev,
        ...updates,
      }));
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className={authorPageContainer()}>
      <div className={aboutAuthorCard()}>
        <div className={authorImageBlock()}>
          <img
            src={avatarSrc || '/default-avatar.png'}
            alt="Author avatar"
            className={authorImageBig()}
          />
        </div>
        <div className={authorInfo()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={authorNameText()}>
              {i18n.language === 'ka' && profile.georgian_name
                ? profile.georgian_name
                : profile.username || 'Anonymous'}
            </h2>
            <Dialog>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Label htmlFor="name">Edit Name</Label>
                  <Input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: t('nameRequired') as string,
                      maxLength: {
                        value: 50,
                        message: t('nameTooLong') as string,
                      },
                    })}
                    onBlur={() => trigger('name')}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}

                  <Label htmlFor="georgianName">Edit Georgian Name</Label>
                  <Input
                    id="georgianName"
                    type="text"
                    {...register('georgianName', {
                      required: t('georgianNameRequired') as string,
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
                      required: t('aboutRequired') as string,
                      maxLength: {
                        value: 200,
                        message: t('aboutTooLong') as string,
                      },
                    })}
                    onBlur={() => trigger('about')}
                  />
                  {errors.about && (
                    <p className="text-red-500 text-sm">
                      {errors.about.message}
                    </p>
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
          <p className={aboutAuthorText()}>
            {profile.about || 'No bio available.'}
          </p>
          <div className={authorSocialMedia()}>
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
          <div className={authorFollowers()}>
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
    </div>
  );
};

export default Profile;
