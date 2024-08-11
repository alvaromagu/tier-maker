import { forwardRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export const Dialog = forwardRef<HTMLDialogElement, { children: ReactNode, className?: string }>(function Dialog({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}, ref) {
  return createPortal(
    <dialog ref={ref} className={className}>
      {children}
    </dialog>,
    document.body
  )
})
