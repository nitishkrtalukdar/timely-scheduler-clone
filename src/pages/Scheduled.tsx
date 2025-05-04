
import React, { useState } from 'react';
import Header from '@/components/Header';
import PostCard, { Post } from '@/components/PostCard';
import { useToast } from '@/components/ui/use-toast';
import { addDays, addHours } from 'date-fns';

// Mock data for scheduled posts
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    content: 'Excited to announce our new product launch! #TimeLy #ProductLaunch',
    scheduledDate: addHours(new Date(), 2),
    platform: 'twitter',
    status: 'scheduled',
  },
  {
    id: '2',
    content: 'Check out our latest blog post about social media scheduling best practices.',
    scheduledDate: addDays(new Date(), 1),
    platform: 'facebook',
    media: [
      { type: 'image', url: '/placeholder.svg' },
    ],
    status: 'scheduled',
  },
  {
    id: '3',
    content: 'Looking for the perfect social media scheduler? TimeLy makes it easy to plan and schedule your content across all platforms!',
    scheduledDate: addDays(new Date(), 2),
    platform: 'linkedin',
    status: 'scheduled',
  },
  {
    id: '4',
    content: 'Beautiful sunset from our office today. #views #officespace',
    scheduledDate: addHours(new Date(), 1),
    platform: 'instagram',
    media: [
      { type: 'image', url: '/placeholder.svg' },
    ],
    status: 'scheduled',
  },
];

const Scheduled: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const { toast } = useToast();

  const handlePostClick = (post: Post) => {
    toast({
      title: `Post for ${post.platform}`,
      description: `Scheduled for ${new Date(post.scheduledDate).toLocaleString()}`,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Header title="Scheduled Posts" />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onClick={handlePostClick} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Scheduled;
