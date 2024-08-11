import { FormEvent, useRef } from 'react'
import { Dialog } from './dialog'
import { Tier, useTierMakerStore } from './tier-maker-store'
import { IconSettings, IconX } from '@tabler/icons-react'
import { error, toast, Toaster } from './toast'

export function TierDialog({
  item,
}: {
  item: Tier
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const updateTier = useTierMakerStore(s => s.updateTier)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log('submit')
    
    event.preventDefault()
    event.stopPropagation()
    const formData = new FormData(event.currentTarget)
    const {
      label,
      color
    } = Object.fromEntries(formData) as {
      label?: string
      color?: string
    }
    const trimmedLabel = label?.trim()
    if (trimmedLabel == null || trimmedLabel === '') {
      return error({ message: 'Label is required', toasterId: item.id })
    }
    const trimmedColor = color?.trim()
    if (trimmedLabel == null || trimmedColor == null) {
      return error({ message: 'Color is required', toasterId: item.id })
    }
    if (trimmedLabel.length > 3) {
      return error({ message: 'Label must be 3 characters or less', toasterId: item.id })
    }
    if (!/^#[0-9a-f]{6}$/i.test(trimmedColor)) {
      return error({ message: 'Color must be a valid hex color', toasterId: item.id })
    }
    updateTier(item.id, { label: trimmedLabel, color: trimmedColor })
    toast({ message: 'Tier updated' })
    ref.current?.close()
  }

  return (
    <>
      <Dialog ref={ref} className='dark:bg-zinc-950 rounded backdrop:backdrop-blur-sm'>
        <div className='flex flex-col p-2'>
          <header className='flex items-center gap-10'>
            <h2 className='flex-1 text-xl font-bold'>
              Tier Settings
            </h2>
            <button
              type='button'
              className='dark:bg-zinc-900 rounded-full p-2'
              onClick={() => ref.current?.close()}
            >
              <IconX className='size-4' />
            </button>
          </header>
          <form className='flex flex-col gap-4 mt-2 group' onSubmit={handleSubmit}>
            <label>
              <span>Tier Label</span>
              <input
                type='text'
                defaultValue={item.label}
                name='label'
                className='w-full p-2 dark:bg-zinc-900 rounded'
                required
                maxLength={3}
              />
            </label>
            <label>
              <span>Tier Color</span>
              <input
                type='color'
                defaultValue={item.color}
                name='color'
                className='w-full dark:bg-zinc-900 rounded'
                required
              />
            </label>
            <button
              type='submit'
              className='w-full p-2 mt-2 dark:bg-zinc-900 rounded'
            >
              Save
            </button>
          </form>
        </div>
        <Toaster id={item.id} />
      </Dialog>
      <div className='absolute right-0 inset-y-0 flex items-center justify-center p-2'>
        <button
          type='button'
          className='dark:bg-zinc-900 rounded-full p-2'
          onClick={() => ref.current?.showModal()}
        >
          <IconSettings className='size-4' />
        </button>
      </div>
    </>
  )
}