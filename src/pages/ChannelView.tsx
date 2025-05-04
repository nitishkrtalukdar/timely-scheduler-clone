
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import PostCard, { Post } from '@/components/PostCard';
import { addDays, addHours } from 'date-fns';
import { capitalCase } from 'change-case';

// Mock data for each platform
const MOCK_POSTS_BY_PLATFORM: Record<string, Post[]> = {
  twitter: [
    {
      id: '1',
      content: 'Excited to announce our new product launch! #TimeLy #ProductLaunch',
      scheduledDate: addHours(new Date(), 2),
      platform: 'twitter',
      status: 'scheduled',
    },
    {
      id: '5',
      content: 'Twitter is all about short, engaging content! What are your social media scheduling tips?',
      scheduledDate: addDays(new Date(), 3),
      platform: 'twitter',
      status: 'scheduled',
    },
  ],
  instagram: [
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
    {
      id: '6',
      content: 'Instagram is all about visual content! Here\'s our team hard at work. #teamwork #behindthescenes',
      scheduledDate: addDays(new Date(), 4),
      platform: 'instagram',
      media: [
        { type: 'image', url: '/placeholder.svg' },
      ],
      status: 'scheduled',
    },
  ],
  facebook: [
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
  ],
  linkedin: [
    {
      id: '3',
      content: 'Looking for the perfect social media scheduler? TimeLy makes it easy to plan and schedule your content across all platforms!',
      scheduledDate: addDays(new Date(), 2),
      platform: 'linkedin',
      status: 'scheduled',
    },
  ],
};

const ChannelView: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();
  const normalizedPlatform = platform?.toLowerCase() || '';
  
  // Get posts for this platform
  const posts = MOCK_POSTS_BY_PLATFORM[normalizedPlatform] || [];

  return (
    <div className="h-screen flex flex-col">
      <Header title={`${capitalCase(normalizedPlatform || '')} Posts`} />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500 my-10">
              No posts scheduled for {capitalCase(normalizedPlatform || '')}.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChannelView;
