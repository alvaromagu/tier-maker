import { create } from 'zustand'

export type TierListItem = {
  id: string
  src: string,
  tier?: string | null
}

interface TierMakerStore {
  items: TierListItem[]
  preview: {
    item: TierListItem | null
    on: TierListItem['tier']
  } | null | undefined
  load: (sources: string[]) => void
  asign: (id: TierListItem['id'], tier: TierListItem['tier']) => void
  unasignAll: () => void
  reset: () => void
  setPreview: (item: TierMakerStore['preview']) => void
}

export const useTierMakerStore = create<TierMakerStore>()(set => ({
  items: new Array<TierListItem>(),
  preview: undefined,
  load: (sources: string[]) => set(state => ({
    items: [...state.items, ...sources.map(src => ({ id: crypto.randomUUID(), src }))]
  })),
  asign: (id: TierListItem['id'], tier: TierListItem['tier']) => set(state => ({
    items: state.items.map(item => item.id === id ? { ...item, tier } : item)
  })),
  unasignAll: () => set(state => ({
    items: state.items.map(item => ({ ...item, tier: undefined }))
  })),
  reset: () => set({ items: [] }),
  setPreview: (preview: TierMakerStore['preview']) => set({ preview })
}))
