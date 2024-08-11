import { create } from 'zustand'

export type TierListItem = {
  id: string
  src: string,
  tier: Tier['id'] | null | undefined
}

export type Tier = {
  id: string
  label: string
  color: string // hex color
}

interface TierMakerStore {
  items: TierListItem[]
  preview: {
    item: TierListItem | null
    on: TierListItem['tier']
  } | null | undefined
  tiers: Tier[]
  load: (sources: string[]) => void
  asign: (id: TierListItem['id'], tier: TierListItem['tier']) => void
  unasignAll: () => void
  reset: () => void
  setPreview: (item: TierMakerStore['preview']) => void
  updateTier: (id: Tier['id'], obj: Omit<Tier, 'id'>) => void
}

const defaultTiers: Tier[] = [
  { id: crypto.randomUUID(), label: 'S', color: '#ff0000' },
  { id: crypto.randomUUID(), label: 'A', color: '#ff8000' },
  { id: crypto.randomUUID(), label: 'B', color: '#ffcc00' },
  { id: crypto.randomUUID(), label: 'C', color: '#ffff00' },
  { id: crypto.randomUUID(), label: 'D', color: '#00ff00' },
]

export const useTierMakerStore = create<TierMakerStore>()(set => ({
  items: new Array<TierListItem>(),
  preview: undefined,
  tiers: defaultTiers,
  load: (sources: string[]) => set(state => ({
    items: [...state.items, ...sources.map(src => ({ id: crypto.randomUUID(), src, tier: undefined }))],
  })),
  asign: (id: TierListItem['id'], tierId: TierListItem['tier']) => set(state => ({
    items: state.items.map(item => item.id === id ? { ...item, tier: tierId } : item)
  })),
  unasignAll: () => set(state => ({
    items: state.items.map(item => ({ ...item, tier: undefined }))
  })),
  reset: () => set({ items: [] }),
  setPreview: (preview: TierMakerStore['preview']) => set({ preview }),
  updateTier: (id: Tier['id'], obj: Omit<Tier, 'id'>) => set(state => ({
    tiers: state.tiers.map(tier => tier.id === id ? { ...obj, id } : tier)
  })),
}))
