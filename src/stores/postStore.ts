
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Post } from '@/components/PostCard';

interface PostStore {
  posts: Post[];
  addPost: (post: Post) => void;
  removePost: (postId: string) => void;
  getPostsByPlatform: (platform: string) => Post[];
  getPostsByDate: (date: Date) => Post[];
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      
      addPost: (post) => set((state) => ({
        posts: [...state.posts, post]
      })),
      
      removePost: (postId) => set((state) => ({
        posts: state.posts.filter(post => post.id !== postId)
      })),
      
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
