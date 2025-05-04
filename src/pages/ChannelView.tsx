
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { capitalCase } from 'change-case';
import { usePostStore } from '@/stores/postStore';
import { Button } from '@/components/ui/button';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useChannelStore } from '@/stores/channelStore';

const ChannelView: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();
  const normalizedPlatform = platform?.toLowerCase() || '';
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { posts } = usePostStore();
  const { connectedChannels, connectChannel, disconnectChannel } = useChannelStore();
  
  // Get posts for this platform
  const channelPosts = posts.filter(post => post.platform === normalizedPlatform);
  
  // Check if this channel is connected
  const isConnected = connectedChannels.includes(normalizedPlatform);
  
  const handleConnect = () => {
    connectChannel(normalizedPlatform);
  };
  
  const handleDisconnect = () => {
    disconnectChannel(normalizedPlatform);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col">
        <Header title={`${capitalCase(normalizedPlatform || '')} Posts`} />
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">{capitalCase(normalizedPlatform || '')} Channel</h2>
            <p className="text-gray-600 mb-8">Please sign in to view your {capitalCase(normalizedPlatform || '')} posts</p>
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
      <Header title={`${capitalCase(normalizedPlatform || '')} Posts`} />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{capitalCase(normalizedPlatform || '')} Posts</h2>
            <div className="flex gap-2">
              {isConnected ? (
                <Button 
                  variant="outline"
                  onClick={handleDisconnect} 
                >
                  Disconnect Account
                </Button>
              ) : (
                <Button 
                  onClick={handleConnect} 
                  variant="outline"
                  className="flex items-center"
                >
                  <LinkIcon className="h-4 w-4 mr-2" /> Connect Account
                </Button>
              )}
              <Button 
                onClick={() => navigate('/create')} 
                className="bg-timely-purple hover:bg-timely-dark-purple"
              >
                <Plus className="h-4 w-4 mr-2" /> Create Post
              </Button>
            </div>
          </div>
          
          {!isConnected ? (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-600 mb-4">Connect your {capitalCase(normalizedPlatform || '')} account to schedule posts</p>
              <Button 
                onClick={handleConnect} 
                variant="outline"
                className="flex items-center"
              >
                <LinkIcon className="h-4 w-4 mr-2" /> Connect Account
              </Button>
            </div>
          ) : channelPosts.length > 0 ? (
            channelPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-600 mb-4">No posts scheduled for {capitalCase(normalizedPlatform || '')}</p>
              <Button 
                onClick={() => navigate('/create')} 
                className="bg-timely-purple hover:bg-timely-dark-purple"
              >
                <Plus className="h-4 w-4 mr-2" /> Create Post
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChannelView;
