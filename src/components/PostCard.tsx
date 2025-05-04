
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Twitter, Instagram, Facebook, Linkedin, FileImage, FileVideo } from "lucide-react";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface Post {
  id: string;
  content: string;
  scheduledDate: Date;
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
  status: 'scheduled' | 'published' | 'failed';
}

interface PostCardProps {
  post: Post;
  onClick?: (post: Post) => void;
}

const platformIcon = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
} as const;

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  published: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
} as const;

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const Icon = platformIcon[post.platform];
  
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick?.(post)}>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-2" />
            <span className="font-semibold capitalize">{post.platform}</span>
          </div>
          <Badge className={cn(statusColors[post.status])}>{post.status}</Badge>
        </div>
        
        <p className="text-gray-800 mb-4 line-clamp-2">{post.content}</p>
        
        {post.media && post.media.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.media.map((item, index) => (
              <div key={index} className="relative w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                {item.type === 'image' ? (
                  <FileImage className="h-6 w-6 text-gray-400" />
                ) : (
                  <FileVideo className="h-6 w-6 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-3">{format(post.scheduledDate, 'MMM d, yyyy')}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{format(post.scheduledDate, 'h:mm a')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
