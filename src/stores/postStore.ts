import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Post } from '@/components/PostCard';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface PostStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (post: Post) => Promise<void>;
  fetchPosts: () => Promise<void>;
  removePost: (postId: string) => Promise<void>;
  getPostsByPlatform: (platform: string) => Post[];
  getPostsByDate: (date: Date) => Post[];
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      loading: false,
      error: null,
      
      fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
          // Check if Supabase is configured properly
          if (!isSupabaseConfigured()) {
            console.warn("Supabase is not configured. Using local storage only.");
            // Don't set error here, just log a warning to allow local storage fallback
            set({ loading: false });
            return;
          }
          
          const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (error) {
            console.error('Error fetching posts:', error);
            set({ error: error.message });
            return;
          }
          
          // Convert Supabase data to Post format
          const formattedPosts: Post[] = data.map(post => ({
            id: post.id,
            content: post.content,
            scheduledDate: new Date(post.scheduled_date),
            platform: post.platform,
            media: post.media || undefined,
            status: post.status
          }));
          
          set({ posts: formattedPosts });
        } catch (err) {
          console.error('Failed to fetch posts:', err);
          set({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
        } finally {
          set({ loading: false });
        }
      },
      
      addPost: async (post) => {
        set({ error: null });
        try {
          // Check if Supabase is configured properly
          if (!isSupabaseConfigured()) {
            set({ error: "Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables." });
            return;
          }
          
          // Format post for Supabase
          const supabasePost = {
            id: post.id,
            content: post.content,
            scheduled_date: post.scheduledDate.toISOString(),
            platform: post.platform,
            media: post.media || null,
            status: post.status
          };
          
          const { error } = await supabase
            .from('posts')
            .insert(supabasePost);
            
          if (error) {
            console.error('Error adding post:', error);
            set({ error: error.message });
            return;
          }
          
          set((state) => ({
            posts: [post, ...state.posts]
          }));
        } catch (err) {
          console.error('Failed to add post:', err);
          set({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
        }
      },
      
      removePost: async (postId) => {
        set({ error: null });
        try {
          // Check if Supabase is configured properly
          if (!isSupabaseConfigured()) {
            set({ error: "Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables." });
            return;
          }
          
          const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);
            
          if (error) {
            console.error('Error removing post:', error);
            set({ error: error.message });
            return;
          }
          
          set((state) => ({
            posts: state.posts.filter(post => post.id !== postId)
          }));
        } catch (err) {
          console.error('Failed to remove post:', err);
          set({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
        }
      },
      
      getPostsByPlatform: (platform) => {
        return get().posts.filter(post => post.platform === platform);
      },
      
      getPostsByDate: (date) => {
        return get().posts.filter(post => {
          const postDate = new Date(post.scheduledDate);
          return (
            postDate.getFullYear() === date.getFullYear() &&
            postDate.getMonth() === date.getMonth() &&
            postDate.getDate() === date.getDate()
          );
        });
      },
    }),
    {
      name: 'timely-posts-storage',
    }
  )
);
