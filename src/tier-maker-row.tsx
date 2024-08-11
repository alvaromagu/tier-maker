import { DragEvent } from 'react'
import { Tier, TierListItem, useTierMakerStore } from './tier-maker-store'
import { contrast } from './utils'
import { TierDialog } from './tier-dialog'

export function TierMakerRow({
  tier
}: {
  tier: Tier
}) {
  const { items, asign, preview, setPreview } = useTierMakerStore()

  function handleDrop(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    asign(event.dataTransfer.getData('text/plain'), tier.id)
    setPreview(null)
  }

  function handleDragOver(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    setPreview({ item: preview?.item ?? null, on: tier.id })
  }

  function handleDragLeave(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    setPreview({ item: preview?.item ?? null, on: null })
  }

  function handleDragStart(item: TierListItem, event: DragEvent<HTMLImageElement>): void {
    event.dataTransfer.setData('text/plain', item.id)
    setPreview({ item, on: null })
  }

  const showPreview = preview?.item != null && preview?.item?.tier !== tier.id && preview?.on === tier.id
  const textColor = contrast(tier.color)

  return (
    <section
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className='flex relative'
    >
      <div
        className='aspect-square w-16 grid place-content-center'
        style={{ backgroundColor: tier.color, color: textColor }}
      >
        {tier.label}
      </div>
      <div className='flex gap-2 overflow-auto flex-1'>
        {items.filter(item => item.tier === tier.id).map((item) => {
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
        <TierDialog item={tier} />
      </div>
    </section>
  )
}