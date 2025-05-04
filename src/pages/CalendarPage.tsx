
import React, { useState } from 'react';
import Header from '@/components/Header';
import CalendarView from '@/components/CalendarView';
import PostCard, { Post } from '@/components/PostCard';
import { addDays, addHours, isSameDay } from 'date-fns';

// Mock data for scheduled posts (same as in Scheduled page)
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

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  
  const postsOnSelectedDate = posts.filter(post => 
    isSameDay(new Date(post.scheduledDate), selectedDate)
  );

  return (
    <div className="h-screen flex flex-col">
      <Header title="Calendar" />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CalendarView 
              posts={posts} 
              onSelectDate={setSelectedDate} 
              selectedDate={selectedDate}
            />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">
              Posts for {selectedDate.toLocaleDateString()}
            </h2>
            {postsOnSelectedDate.length > 0 ? (
              postsOnSelectedDate.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-gray-500">No posts scheduled for this date.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
