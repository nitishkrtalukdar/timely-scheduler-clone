
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, Twitter, Instagram, Facebook, Linkedin, Upload, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface PostFormProps {
  onSubmit: (data: {
    content: string;
    platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
    scheduledDate: Date;
    media: File[];
  }) => void;
  disabled?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, disabled = false }) => {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState<'twitter' | 'instagram' | 'facebook' | 'linkedin'>('twitter');
  
  // Date and time state
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeHours, setTimeHours] = useState<number>(new Date().getHours());
  const [timeMinutes, setTimeMinutes] = useState<number>(new Date().getMinutes());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const [media, setMedia] = useState<File[]>([]);
  
  // Combine date and time into one Date object
  const getScheduledDateTime = () => {
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(timeHours);
    scheduledDateTime.setMinutes(timeMinutes);
    return scheduledDateTime;
  };
  
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
    
    if (!content.trim()) {
      alert('Please enter some content for your post');
      return;
    }
    
    // Create a post object with the combined date and time
    const postData = {
      content,
      platform,
      scheduledDate: getScheduledDateTime(),
      media,
    };
    
    console.log('Post data:', postData);
    onSubmit(postData);
    
    // Reset form after submission
    setContent('');
    setMedia([]);
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

  // Make sure we have a valid platform
  const currentPlatform = platform in platformConfigs ? platform : 'twitter';
  const currentConfig = platformConfigs[currentPlatform];
  
  // Format hours for display (12-hour format with AM/PM)
  const formatTimeForDisplay = () => {
    const hours = timeHours % 12 || 12;
    const minutes = timeMinutes.toString().padStart(2, '0');
    const period = timeHours >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${period}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="mb-4">
            <ToggleGroup 
              type="single" 
              value={platform} 
              onValueChange={(value) => setPlatform(value as any)}
              disabled={disabled}
            >
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
              disabled={disabled}
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
                    disabled={disabled}
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between flex-wrap gap-2">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex gap-1"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={disabled}
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
                disabled={disabled}
              />

              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="flex gap-1"
                    disabled={disabled}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    <span>{format(selectedDate, 'MMM d, yyyy')}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setSelectedDate(newDate);
                        setShowCalendar(false);
                      }
                    }}
                    initialFocus
                    className="pointer-events-auto"
                    disabled={disabled}
                  />
                </PopoverContent>
              </Popover>

              <Popover open={showTimePicker} onOpenChange={setShowTimePicker}>
                <PopoverTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="flex gap-1"
                    disabled={disabled}
                  >
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeForDisplay()}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3" align="start">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hours">Hour</Label>
                      <Slider
                        id="hours"
                        min={0}
                        max={23}
                        step={1}
                        value={[timeHours]}
                        onValueChange={(value) => setTimeHours(value[0])}
                        className="mt-2"
                      />
                      <div className="text-center mt-1">{timeHours.toString().padStart(2, '0')}</div>
                    </div>
                    
                    <div>
                      <Label htmlFor="minutes">Minute</Label>
                      <Slider
                        id="minutes"
                        min={0}
                        max={59}
                        step={1}
                        value={[timeMinutes]}
                        onValueChange={(value) => setTimeMinutes(value[0])}
                        className="mt-2"
                      />
                      <div className="text-center mt-1">{timeMinutes.toString().padStart(2, '0')}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const now = new Date();
                          setTimeHours(now.getHours());
                          setTimeMinutes(now.getMinutes());
                        }}
                      >
                        Set to Now
                      </Button>
                      <Button 
                        type="button" 
                        variant="default"
                        size="sm"
                        onClick={() => setShowTimePicker(false)}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button
              type="submit"
              className="bg-timely-purple hover:bg-timely-dark-purple"
              disabled={disabled}
            >
              {disabled ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                'Schedule'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default PostForm;
