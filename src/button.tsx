import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { cn } from './utils'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function Button(
  props: ButtonProps
) {
  return (
    <button 
      {...props}
      className={cn('bg-blue-400 dark:bg-blue-900 rounded-full p-2', props.className)} 
    />
  )
}