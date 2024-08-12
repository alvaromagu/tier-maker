import { FormEvent, useRef } from 'react'
import { Dialog } from './dialog'
import { IconTableDown, IconX } from '@tabler/icons-react'
import { toast, Toaster } from './toast'
import { useTierMakerStore } from './tier-maker-store'

export function AddTierDialog({
  from,
}: {
  from: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const positionRef = useRef<'before' | 'after' | null>(null)
  const addTier = useTierMakerStore(s => s.addTier)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    if (positionRef.current == null) {
      ref.current?.close()
      return
    }

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
      return toast.error({ message: 'Label is required', toasterId: `add-tier-${from}` })
    }
    const trimmedColor = color?.trim()
    if (trimmedLabel == null || trimmedColor == null) {
      return toast.error({ message: 'Color is required', toasterId: `add-tier-${from}` })
    }
    if (trimmedLabel.length > 3) {
      return toast.error({ message: 'Label must be 3 characters or less', toasterId: `add-tier-${from}` })
    }
    if (!/^#[0-9a-f]{6}$/i.test(trimmedColor)) {
      return toast.error({ message: 'Color must be a valid hex color', toasterId: `add-tier-${from}` })
    }
    const position = positionRef.current === 'before' ? { beforeId: from } : { afterId: from }
    addTier({ label: trimmedLabel, color: trimmedColor }, position)
    toast.success({ message: 'Tier added' })
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
                placeholder='Tier: S'
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
                placeholder='#ff0000'
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
        <Toaster id={`add-tier-${from}`} />
      </Dialog>
      <button
        type='button'
        className='dark:bg-zinc-900 rounded-full p-2'
        onClick={() => {
          positionRef.current = 'before'
          ref.current?.showModal()
        }}
      >
        <IconTableDown className='size-4 rotate-180' />
      </button>
      <button
        type='button'
        className='dark:bg-zinc-900 rounded-full p-2'
        onClick={() => {
          positionRef.current = 'after'
          ref.current?.showModal()
        }}
      >
        <IconTableDown className='size-4' />
      </button>
    </>
  )
}