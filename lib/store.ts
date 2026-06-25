'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lang } from './data';

interface AppState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  step: 1 | 2 | 3;
  boxType: 'capsule' | 'group' | null;
  selected: number[];
  filter: string;
  setStep: (step: 1 | 2 | 3) => void;
  setBoxType: (type: 'capsule' | 'group') => void;
  toggleProduct: (id: number) => void;
  removeProduct: (id: number) => void;
  setFilter: (filter: string) => void;
  resetBuilder: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === 'ar' ? 'en' : 'ar' }),
      step: 1,
      boxType: null,
      selected: [],
      filter: 'all',
      setStep: (step) => set({ step }),
      setBoxType: (type) => set({ boxType: type, step: 2, selected: [], filter: 'all' }),
      toggleProduct: (id) => {
        const { selected, boxType } = get();
        const max = boxType === 'capsule' ? 5 : 10;
        if (selected.includes(id)) {
          set({ selected: selected.filter(x => x !== id) });
        } else if (selected.length < max) {
          set({ selected: [...selected, id] });
        }
      },
      removeProduct: (id) => set({ selected: get().selected.filter(x => x !== id) }),
      setFilter: (filter) => set({ filter }),
      resetBuilder: () => set({ step: 1, boxType: null, selected: [], filter: 'all' }),
    }),
    { name: 'qom-store', partialize: (s) => ({ lang: s.lang }) }
  )
);
