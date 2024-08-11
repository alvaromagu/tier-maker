import { ChangeEvent, DragEvent, RefObject } from 'react'
import { IconArrowDown, IconPhotoDown, IconPhotoPlus, IconRestore } from '@tabler/icons-react'
import { TierListItem, useTierMakerStore } from './tier-maker-store'
import { parseFiles } from './utils'
import html2canvas from 'html2canvas-pro'

export function TierMakerForm({
  tiersRef
}: {
  tiersRef: RefObject<HTMLUListElement>
}) {
  const { items, preview, load, asign, reset, unasignAll, setPreview } = useTierMakerStore()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target
    parseFiles(Array.from(files ?? []))
      .then(load)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    if (event.dataTransfer.types.includes('text/plain')) {
      asign(event.dataTransfer.getData('text/plain'), undefined)
    } else if (event.dataTransfer.types.includes('Files')) {
      parseFiles(Array.from(event.dataTransfer.files ?? []))
        .then(load)
    }
    setPreview(null)
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    setPreview({ item: preview?.item ?? null, on: undefined })
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    setPreview({ item: preview?.item ?? null, on: null })
  }

  function handleDragStart(item: TierListItem, event: DragEvent<HTMLImageElement>): void {
    event.dataTransfer.setData('text/plain', item.id)
    setPreview({ item, on: null })
  }

  function download() {
    html2canvas(tiersRef.current as HTMLElement).then(canvas => {
      const link = document.createElement('a')
      link.download = 'tier-list.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    })
  }

  const showPreview = preview?.item != null && preview?.item?.tier !== undefined && preview?.on === undefined
  

  return (
    <form className='flex flex-1 flex-col p-2'>
      <div className='flex justify-center gap-2 mb-2'>
        <label className='dark:bg-zinc-900 rounded-full p-2'>
          <IconPhotoPlus className='size-4' />
          <input onChange={handleInputChange} name='images' type='file' multiple accept='image/*' className='hidden' />
        </label>
        <button type='button' onClick={unasignAll} className='dark:bg-zinc-900 rounded-full p-2'>
          <IconArrowDown className='size-4' />
        </button>
        <button type='button' onClick={download} className='dark:bg-zinc-900 rounded-full p-2'>
          <IconPhotoDown className='size-4' />
        </button>
        <button type='button' onClick={reset} className='dark:bg-zinc-900 rounded-full p-2'>
          <IconRestore className='size-4' />
        </button>
      </div>

      <div
        className='bg-zinc-900 flex-1 p-2 flex gap-2 flex-wrap'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {items.filter(item => item.tier == null).map((item) => {
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
    </form>
  )
}