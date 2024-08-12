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

type AfterBefore = { afterId: string } | { beforeId: string }

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
  addTier: (tier: Omit<Tier, 'id'>, positionId: AfterBefore) => void
  moveUp: (id: Tier['id']) => void
  moveDown: (id: Tier['id']) => void
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
  load: sources => set(state => ({
    items: [...state.items, ...sources.map(src => ({ id: crypto.randomUUID(), src, tier: undefined }))],
  })),
  asign: (id, tierId) => set(state => ({
    items: state.items.map(item => item.id === id ? { ...item, tier: tierId } : item)
  })),
  unasignAll: () => set(state => ({
    items: state.items.map(item => ({ ...item, tier: undefined }))
  })),
  reset: () => set({ items: [] }),
  setPreview: (preview: TierMakerStore['preview']) => set({ preview }),
  updateTier: (id, obj) => set(state => ({
    tiers: state.tiers.map(tier => tier.id === id ? { ...obj, id } : tier)
  })),
  addTier: (tier, positionId) => set(state => {
    const newTier = { ...tier, id: crypto.randomUUID() }
    const index = state.tiers.findIndex(tier => 'beforeId' in positionId ? tier.id === positionId.beforeId : tier.id === positionId.afterId)
    const tiers = [...state.tiers]
    if ('beforeId' in positionId) tiers.splice(index, 0, newTier)
    else tiers.splice(index + 1, 0, newTier)
    return { tiers }
  }),
  moveUp: id => set(state => {
    const index = state.tiers.findIndex(tier => tier.id === id)
    if (index === 0) return {}
    const tiers = [...state.tiers]
    const [removed] = tiers.splice(index, 1)
    tiers.splice(index - 1, 0, removed)
    return { tiers }
  }),
  moveDown: id => set(state => {
    const index = state.tiers.findIndex(tier => tier.id === id)
    if (index === state.tiers.length - 1) return {}
    const tiers = [...state.tiers]
    const [removed] = tiers.splice(index, 1)
    tiers.splice(index + 1, 0, removed)
    return { tiers }
  }),
}))
