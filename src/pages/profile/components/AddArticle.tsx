import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/supabase';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface BlogInputs {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
}

const AddArticle: React.FC<{ profileId: string }> = ({ profileId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BlogInputs>();

  const onSubmit = async () => {
    if (!file) {
      setFileError('Please upload an image file.');
      return;
    }

    setIsDialogOpen(true);
  };

  const confirmSubmit = async (data: BlogInputs) => {
    try {
      const filePath = `${Date.now()}-${file!.name}`;
      const { error: fileError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file!);

      if (fileError) {
        console.error('Error uploading file:', fileError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData?.publicUrl;
      if (!imageUrl) {
        console.error('Error retrieving public URL for uploaded image.');
        return;
      }

      const { error } = await supabase.from('blog').insert([
        {
          title_ka: data.title_ka,
          title_en: data.title_en,
          description_ka: data.description_ka,
          description_en: data.description_en,
          image_url: imageUrl,
          user_id: profileId,
        },
      ]);

      if (error) {
        console.error('Error adding blog:', error.message);
        return;
      }

      alert('Blog added successfully!');
      reset();
      setFile(null);
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error('Error submitting blog:', error.message);
    }
  };

  return (
    <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-600">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title_ka">Title (KA)</Label>
        <Input
          id="title_ka"
          {...register('title_ka', {
            required: 'Title in Georgian is required',
          })}
        />
        {errors.title_ka && (
          <p className="text-red-500">{errors.title_ka.message}</p>
        )}

        <Label htmlFor="title_en">Title (EN)</Label>
        <Input
          id="title_en"
          {...register('title_en', {
            required: 'Title in English is required',
          })}
        />
        {errors.title_en && (
          <p className="text-red-500">{errors.title_en.message}</p>
        )}

        <Label htmlFor="description_ka">Description (KA)</Label>
        <Textarea
          id="description_ka"
          {...register('description_ka', {
            required: 'Description in Georgian is required',
          })}
        />
        {errors.description_ka && (
          <p className="text-red-500">{errors.description_ka.message}</p>
        )}

        <Label htmlFor="description_en">Description (EN)</Label>
        <Textarea
          id="description_en"
          {...register('description_en', {
            required: 'Description in English is required',
          })}
        />
        {errors.description_en && (
          <p className="text-red-500">{errors.description_en.message}</p>
        )}

        <Label htmlFor="image_file">Image File</Label>
        <Input
          id="image_file"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {fileError && <p className="text-red-500">{fileError}</p>}

        <Button className="w-full mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Blog'}
        </Button>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to publish this article?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit(confirmSubmit)}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddArticle;
