import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings, MistralModel } from '../types';

interface SettingsStore extends Settings {
  setApiKey: (key: string) => void;
  setModel: (model: MistralModel) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      apiKey: '',
      model: 'mistral-small-latest',
      setApiKey: (apiKey) => set({ apiKey }),
      setModel: (model) => set({ model }),
    }),
    {
      name: 'mistree-settings',
    }
  )
);