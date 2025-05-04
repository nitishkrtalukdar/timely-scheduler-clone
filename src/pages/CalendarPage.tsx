
import React, { useState } from 'react';
import Header from '@/components/Header';
import CalendarView from '@/components/CalendarView';
import PostCard from '@/components/PostCard';
import { isSameDay } from 'date-fns';
import { usePostStore } from '@/stores/postStore';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { posts } = usePostStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const postsOnSelectedDate = posts.filter(post => 
    isSameDay(new Date(post.scheduledDate), selectedDate)
  );

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col">
        <Header title="Calendar" />
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>
            <p className="text-gray-600 mb-8">Please sign in to view your scheduled posts</p>
            <Button onClick={() => navigate('/login')} className="bg-timely-purple hover:bg-timely-dark-purple">
              Sign In
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
