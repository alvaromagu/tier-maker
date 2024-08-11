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


export function contrast (hexColor: string) {
  const r = parseInt(hexColor.substring(1, 3), 16)
  const g = parseInt(hexColor.substring(3, 5), 16)
  const b = parseInt(hexColor.substring(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}
