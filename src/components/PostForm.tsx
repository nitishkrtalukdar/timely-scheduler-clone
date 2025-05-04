
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Twitter, Instagram, Facebook, Linkedin, Upload, Plus } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface PostFormProps {
  onSubmit: (data: {
    content: string;
    platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
    scheduledDate: Date;
    media: File[];
  }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState<'twitter' | 'instagram' | 'facebook' | 'linkedin'>('twitter');
  const [date, setDate] = useState<Date>(new Date());
  const [media, setMedia] = useState<File[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setMedia([...media, ...newFiles]);
    }
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      content,
      platform,
      scheduledDate: date,
      media,
    });
  };

  const platformConfigs = {
    twitter: {
      icon: Twitter,
      maxChars: 280,
      label: 'Tweet',
      mediaTypes: 'image/*, video/*',
    },
    instagram: {
      icon: Instagram,
      maxChars: 2200,
      label: 'Post',
      mediaTypes: 'image/*, video/*',
    },
    facebook: {
      icon: Facebook,
      maxChars: 63206,
      label: 'Post',
      mediaTypes: 'image/*, video/*',
    },
    linkedin: {
      icon: Linkedin,
      maxChars: 3000,
      label: 'Post',
      mediaTypes: 'image/*, video/*',
    },
  };

  const currentConfig = platformConfigs[platform];
  const Icon = currentConfig.icon;

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="mb-4">
            <ToggleGroup type="single" value={platform} onValueChange={(value) => setPlatform(value as any)}>
              <ToggleGroupItem value="twitter" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="instagram" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="facebook" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="linkedin" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="mb-4">
            <Textarea
              placeholder={`What would you like to ${platform === 'twitter' ? 'tweet' : 'post'}?`}
              className="min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={currentConfig.maxChars}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {content.length}/{currentConfig.maxChars}
            </div>
          </div>

          {media.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {media.map((file, index) => (
                <div key={index} className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded media ${index}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-xs text-gray-500">Video</span>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0 h-5 w-5 p-0 rounded-full"
                    onClick={() => removeMedia(index)}
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex gap-1"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept={currentConfig.mediaTypes}
                onChange={handleFileChange}
                className="hidden"
              />

              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="flex gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(date, 'MMM d, h:mm a')}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setDate(newDate);
                        setShowCalendar(false);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              type="submit"
              className="bg-timely-purple hover:bg-timely-dark-purple"
            >
              Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default PostForm;
