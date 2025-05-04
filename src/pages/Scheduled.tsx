
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { useToast } from '@/components/ui/use-toast';
import { usePostStore } from '@/stores/postStore';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const Scheduled: React.FC = () => {
  const { posts, fetchPosts, loading } = usePostStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [fetchPosts, isAuthenticated]);

  const handlePostClick = (post: any) => {
    toast({
      title: `Post for ${post.platform}`,
      description: `Scheduled for ${new Date(post.scheduledDate).toLocaleString()}`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col">
        <Header title="Scheduled Posts" />
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome to TimeLy</h2>
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
      <Header title="Scheduled Posts" />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Scheduled Posts</h2>
            <Button 
              onClick={() => navigate('/create')} 
              className="bg-timely-purple hover:bg-timely-dark-purple"
            >
              <Plus className="h-4 w-4 mr-2" /> Create Post
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-timely-purple" />
              <span className="ml-2">Loading posts...</span>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} onClick={handlePostClick} />
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-600 mb-4">No posts scheduled yet</p>
              <Button 
                onClick={() => navigate('/create')} 
                className="bg-timely-purple hover:bg-timely-dark-purple"
              >
                <Plus className="h-4 w-4 mr-2" /> Create Your First Post
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Scheduled;
