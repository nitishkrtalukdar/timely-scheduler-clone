
import React from 'react';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { usePostStore } from '@/stores/postStore';
import { Post } from '@/components/PostCard';

const CreatePost: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addPost } = usePostStore();
  
  const handleSubmit = (data: {
    content: string;
    platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
    scheduledDate: Date;
    media: File[];
  }) => {
    console.log('Post data:', data);
    
    // Convert File objects to media items
    const mediaItems = data.media.map(file => ({
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: URL.createObjectURL(file),
    })) as Array<{type: 'image' | 'video'; url: string}>;
    
    // Create a new post
    const newPost: Post = {
      id: uuidv4(),
      content: data.content,
      scheduledDate: data.scheduledDate,
      platform: data.platform,
      media: mediaItems.length > 0 ? mediaItems : undefined,
      status: 'scheduled',
    };
    
    // Add post to store
    addPost(newPost);
    
    toast({
      title: "Success!",
      description: `Post scheduled for ${data.platform} on ${data.scheduledDate.toLocaleString()}`,
    });
    
    // Navigate back to scheduled posts
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col">
      <Header title="Create Post" />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Create a New Post</h2>
          <PostForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
