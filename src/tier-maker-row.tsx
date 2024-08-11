import { cn } from './utils'
import { DragEvent } from 'react'
import { TierListItem, useTierMakerStore } from './tier-maker-store'

export function TierMakerRow({
  label,
  tier,
  labelClassName,
}: {
  label: string,
  tier: string,
  labelClassName?: string,
}) {
  const { items, asign, preview, setPreview } = useTierMakerStore()

  function handleDrop(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    asign(event.dataTransfer.getData('text/plain'), tier)
    setPreview(null)
  }

  function handleDragOver(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    setPreview({ item: preview?.item ?? null, on: tier })
  }

  function handleDragLeave(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    setPreview({ item: preview?.item ?? null, on: null })
  }

  function handleDragStart(item: TierListItem, event: DragEvent<HTMLImageElement>): void {
    event.dataTransfer.setData('text/plain', item.id)
    setPreview({ item, on: null })
  }

  const showPreview = preview?.item != null && preview?.item?.tier !== tier && preview?.on === tier

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
        {showPreview && (
          <img
            src={preview?.item?.src}
            className='size-16 object-cover pointer-events-none'
          />
        )}
      </div>
    </section>
  )
}