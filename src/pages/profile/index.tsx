import React, { useEffect, useState } from 'react';
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

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editGeorgianName, setEditGeorgianName] = useState('');
  const [editAbout, setEditAbout] = useState('');
  const { i18n } = useTranslation();

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
          setEditName(profileData.username || '');
          setEditGeorgianName(profileData.georgian_name || '');
          setEditAbout(profileData.about || '');
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
  }, []);

  const handleUpdateProfile = async () => {
    try {
      if (!profile) return;

      const updates = {
        username: editName,
        georgian_name: editGeorgianName,
        about: editAbout,
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
      alert('Profile updated successfully!');
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
                    <Label htmlFor="editName">Edit Name</Label>
                    <Input
                      id="editName"
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                    <Label htmlFor="editGeorgianName">Edit Georgian Name</Label>
                    <Input
                      id="editGeorgianName"
                      type="text"
                      value={editGeorgianName}
                      onChange={(e) => setEditGeorgianName(e.target.value)}
                      required
                    />
                    <Label htmlFor="about">Edit About</Label>
                    <Textarea
                      id="about"
                      value={editAbout}
                      onChange={(e) => setEditAbout(e.target.value)}
                      required
                    />
                    <Button className="w-full" onClick={handleUpdateProfile}>
                      Save Changes
                    </Button>
                  </DialogDescription>
                </DialogHeader>
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
              <span className={followersText()}>
                {profile.followers || '0'} Followers
              </span>
            </div>
            <div className={followersColumn()}>
              <img
                src={follower}
                alt="Following icon"
                className={followersIcon()}
              />
              <span className={followersText()}>
                {profile.following || '0'} Following
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
