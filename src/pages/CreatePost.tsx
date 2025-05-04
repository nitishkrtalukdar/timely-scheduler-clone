
import React from 'react';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (data: {
    content: string;
    platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
    scheduledDate: Date;
    media: File[];
  }) => {
    console.log('Post data:', data);
    // In a real app, this would send the data to an API
    
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
