import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/supabase';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileInfo, { ProfileInputs } from './components/ProfileInfo';
import AddArticle from './components/AddArticle';
import YourArticles from './components/YourArticles';

import { Database } from '@/supabase/supabase.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const [blogs, setBlogs] = useState<
    Database['public']['Tables']['blog']['Row'][]
  >([]);
  const {
    register,
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data: blogsData, error } = await supabase
          .from('blog')
          .select('*');
        if (error) {
          console.error('Error fetching blogs:', error.message);
          return;
        }
        setBlogs(blogsData || []);
      } catch (error) {
        console.error('Unexpected error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="max-w-full px-4 py-8 flex flex-col items-center">
      <ProfileInfo
        profile={profile}
        avatarSrc={avatarSrc}
        onSubmit={async (data) => {
          const updates = {
            ...profile,
            username: data.name,
            georgian_name: data.georgianName,
            about: data.about,
          };
          const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', profile.id);
          if (!error) {
            setProfile((prev) => ({ ...prev, ...updates }));
          }
        }}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
        trigger={(name) => trigger(name as keyof ProfileInputs)}
      />
      <div className="max-w-4xl w-full">
        <Tabs defaultValue="article" className="w-full">
          <TabsList>
            <TabsTrigger value="article">Your Articles</TabsTrigger>
            <TabsTrigger value="add">Add Article</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <YourArticles blogs={blogs} />
          </TabsContent>
          <TabsContent value="add">
            <AddArticle profileId={profile.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
