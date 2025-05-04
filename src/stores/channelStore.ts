
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChannelStore {
  connectedChannels: string[];
  connectChannel: (platform: string) => void;
  disconnectChannel: (platform: string) => void;
  isChannelConnected: (platform: string) => boolean;
}

export const useChannelStore = create<ChannelStore>()(
  persist(
    (set, get) => ({
      connectedChannels: [],
      
      connectChannel: (platform) => set((state) => {
        if (!state.connectedChannels.includes(platform)) {
          return { connectedChannels: [...state.connectedChannels, platform] };
        }
        return state;
      }),
      
      disconnectChannel: (platform) => set((state) => ({
        connectedChannels: state.connectedChannels.filter(ch => ch !== platform)
      })),
      
      isChannelConnected: (platform) => {
        return get().connectedChannels.includes(platform);
      },
    }),
    {
      name: 'timely-channels-storage',
    }
  )
);
