import { cn } from './cn'
import { DragEvent, Dispatch, SetStateAction, useState } from 'react'
import { TierListItem } from './tlh'

export function TLR({
  label,
  tier,
  asign,
  items,
  labelClassName,
  draggingItem,
  setDraggingItem
}: {
  label: string,
  asign: (id: string, tier: string) => void,
  setDraggingItem: Dispatch<SetStateAction<TierListItem | null>>,
  draggingItem: TierListItem | null,
  tier: string,
  items: TierListItem[]
  labelClassName?: string,
}) {
  const [showPreview, setShowPreview] = useState(false)

  function handleDrop(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    asign(event.dataTransfer.getData('text/plain'), tier)
    setShowPreview(false)
    setDraggingItem(null)
  }

  function handleDragOver(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    setShowPreview(true)
  }

  function handleDragLeave(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    setShowPreview(false)
  }

  function handleDragStart(item: TierListItem, event: DragEvent<HTMLImageElement>): void {
    setDraggingItem(item)
    event.dataTransfer.setData('text/plain', item.id)
  }

  return (
    <section
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className='flex'
    >
      <div className={
        cn('aspect-square w-16 grid place-content-center', labelClassName)
      }>
        {label}
      </div>
      <div className='flex gap-2 overflow-auto flex-1'>
        {items.filter(item => item.tier === tier).map((item) => {
          return (
            <img
              draggable
              onDragStart={(evt) => handleDragStart(item, evt)}
              onDragEnd={e => e.preventDefault()}
              key={item.id}
              src={item.src}
              className='size-16 object-cover'
            />
          )
        })}
        {showPreview && draggingItem?.tier !== tier && (
          <img
            src={draggingItem?.src}
            className='size-16 object-cover pointer-events-none'
          />
        )}
      </div>
    </section>
  )
}