import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}

export async function parseFiles(files: File[]): Promise<string[]> {
  const filesUrlsPromise = files.map(file => {
    return new Promise<string | null>(resolve => {
      const reader = new FileReader()
      reader.addEventListener(
        'loadend',
        () => {
          resolve(typeof reader.result === 'string' ? reader.result : null)
        },
        false
      )
      reader.readAsDataURL(file)
    })
  })

  const images = await Promise.all(filesUrlsPromise)
  return images.filter(Boolean) as string[]
}
