import { useRef, useState } from 'react'

export type TierListItem = {
  id: string
  src: string,
  tier?: string | null
}

export function useTierList () {
  const [items, setItems] = useState<TierListItem[]>([])
  const [draggingItem, setDraggingItem] = useState<TierListItem | null>(null)
  const tiersRef = useRef<HTMLUListElement>(null)
  function load (sources: string[]){
    setItems(prev => [...prev, ...sources.map(src => ({id: crypto.randomUUID(), src}))])
  }
  function asign (id: TierListItem['id'], tier: TierListItem['tier']) {
    setItems(prev => prev.map(item => item.id === id ? {...item, tier} : item))
  }
  function reset () {
    setItems([])
  }
  function unasignAll () {
    setItems(prev => prev.map(item => ({...item, tier: undefined})))
  }
  return {items, draggingItem, tiersRef, load, asign, reset, unasignAll, setDraggingItem}
}