
import React from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Post } from '@/components/PostCard';
import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import { isSameDay } from 'date-fns';
import { DayClickEventHandler } from 'react-day-picker';

interface CalendarViewProps {
  posts: Post[];
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

const platformIcons = {
  twitter: <Twitter className="h-3 w-3" />,
  instagram: <Instagram className="h-3 w-3" />,
  facebook: <Facebook className="h-3 w-3" />,
  linkedin: <Linkedin className="h-3 w-3" />,
};

const CalendarView: React.FC<CalendarViewProps> = ({ posts, onSelectDate, selectedDate }) => {
  // Custom day content renderer
  const renderDay = (day: Date, modifiers: Record<string, boolean> | undefined) => {
    if (!day) {
      return <div />;
    }
    
    const postsOnDay = posts.filter((post) => isSameDay(new Date(post.scheduledDate), day));
    
    const platformsOnDay = postsOnDay.reduce<Record<string, boolean>>((acc, post) => {
      acc[post.platform] = true;
      return acc;
    }, {});
    
    const platformList = Object.keys(platformsOnDay) as Array<keyof typeof platformIcons>;
    
    return (
      <div className="relative w-full h-full flex flex-col items-center">
        <span className="text-center">{day.getDate()}</span>
        {postsOnDay.length > 0 && (
          <div className="flex mt-1 gap-1">
            {platformList.map((platform) => (
              <div key={platform} className="text-xs">
                {platformIcons[platform]}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="p-4">
      <CalendarComponent
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onSelectDate(date)}
        className="rounded-md border pointer-events-auto"
        components={{
          Day: ({ date, displayMonth }) => date ? renderDay(date, {}) : null
        }}
      />
    </Card>
  );
};

export default CalendarView;
