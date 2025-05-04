
import React, { useState } from 'react';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { usePostStore } from '@/stores/postStore';
import { Post } from '@/components/PostCard';
import { supabase } from '@/lib/supabase';

const CreatePost: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addPost } = usePostStore();
  const [uploading, setUploading] = useState(false);
  
  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `media/${fileName}`;
      
      const { error } = await supabase.storage
        .from('timely')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }
      
      // Get public URL
      const { data } = supabase.storage
        .from('timely')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };
  
  const handleSubmit = async (data: {
    content: string;
    platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
    scheduledDate: Date;
    media: File[];
  }) => {
    try {
      setUploading(true);
      console.log('Post data:', data);
      
      // Upload media files and get URLs
      let mediaItems: Array<{ type: 'image' | 'video'; url: string }> = [];
      
      if (data.media.length > 0) {
        const uploadPromises = data.media.map(async (file) => {
          const url = await uploadFile(file);
          if (url) {
            return {
              type: file.type.startsWith('image/') ? 'image' as const : 'video' as const,
              url
            };
          }
          return null;
        });
        
        const results = await Promise.all(uploadPromises);
        mediaItems = results.filter(item => item !== null) as Array<{ type: 'image' | 'video'; url: string }>;
      }
      
      // Create a new post
      const newPost: Post = {
        id: uuidv4(),
        content: data.content,
        scheduledDate: data.scheduledDate,
        platform: data.platform,
        media: mediaItems.length > 0 ? mediaItems : undefined,
        status: 'scheduled',
      };
      
      // Add post to store and Supabase
      await addPost(newPost);
      
      toast({
        title: "Success!",
        description: `Post scheduled for ${data.platform} on ${data.scheduledDate.toLocaleString()}`,
      });
      
      // Navigate back to scheduled posts
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header title="Create Post" />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Create a New Post</h2>
          <PostForm onSubmit={handleSubmit} disabled={uploading} />
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
