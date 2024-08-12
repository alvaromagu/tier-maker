/* eslint-disable react-refresh/only-export-components */
import { IconCheck, IconX } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { create } from 'zustand'

type Toast = {
  toasterId?: string
  id: string
  message: string
  duration?: number
  type?: 'success' | 'error'
}

type ToastsStore = {
  toasts: Toast[]
  show: (toast: Omit<Toast, 'id'>) => void
  hide: (toast: Toast) => void
}

const useToastsStore = create<ToastsStore>()((set) => ({
  toasts: [],
  show: (toast) => set((state) => ({ toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }] })),
  hide: (toast) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== toast.id),
  })),
}))


const error = (toast: Omit<Toast, 'type' | 'id'>) => useToastsStore.getState().show({ ...toast, type: 'error' })
const success = (toast: Omit<Toast, 'type' | 'id'>) => useToastsStore.getState().show({ ...toast, type: 'success' })
export const toast = {
  error, success
}

export function Toaster({
  id
}: {
  id?: string
}) {
  const toasts = useToastsStore((state) => state.toasts.filter((t) => t.toasterId === id))  

  return (
    <div className='flex flex-col gap-2 items-end fixed bottom-0 right-0 p-4'>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

const typeIcon = {
  success: (
    <span className='bg-green-400 dark:text-black rounded-full size-5 flex items-center justify-center'>
      <IconCheck size={16} />
    </span>
  ),
  error: (
    <span className='bg-red-400 rounded-full size-5 flex items-center justify-center'>
      <IconX size={16} />
    </span>
  ),
} as const

function Toast({ toast }: { toast: Toast }) {
  const [isHiding, setIsHiding] = useState(false)
  const hide = useToastsStore((state) => state.hide)
  const toastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHiding(true)
    }, toast.duration ?? 5000)
    return () => clearTimeout(timeout)
  }, [toast.duration])

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (isHiding) hide(toast)
    }

    const toastElement = toastRef.current
    toastElement?.addEventListener('transitionend', handleAnimationEnd)

    return () => {
      toastElement?.removeEventListener('transitionend', handleAnimationEnd)
    }
  }, [isHiding, hide, toast])

  function dismiss() {
    setIsHiding(true)
  }

  const icon = toast.type ? typeIcon[toast.type] : null

  return (
    <div
      ref={toastRef}
      className={`dark:bg-zinc-950 px-4 py-2 rounded transition-opacity flex gap-4 items-center shadow-xl ${
        isHiding ? 'opacity-0' : 'opacity-100'
      } border`}
      onClick={dismiss}
    >
      {icon}
      <span className='flex-1'>{toast.message}</span>
    </div>
  )
}
