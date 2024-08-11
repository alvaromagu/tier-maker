import { useRef } from 'react'
import { TierMakerForm } from './tier-maker-form'
import { TierMakerRow } from './tier-maker-row'

const tiers = [
  { label: 'S', className: 'bg-red-400' },
  { label: 'A', className: 'bg-orange-800' },
  { label: 'B', className: 'bg-orange-300' },
  { label: 'C', className: 'bg-yellow-400' },
  { label: 'D', className: 'bg-green-500' },
]

function App() {
  const tiersRef = useRef<HTMLUListElement>(null)

  return (
    <main className='flex flex-col h-screen'>
      <header className='flex p-2'>
        <img src='/logo.png' className='aspect-[200/37] w-40' />
      </header>
      <ul ref={tiersRef} className='*:border-t'>
        {tiers.map(({ label, className }) => (
          <li key={label} className='last:border-b'>
            <TierMakerRow 
              tier={label} 
              label={label} 
              labelClassName={className} 
            />
          </li>
        ))}
      </ul>
      <TierMakerForm tiersRef={tiersRef} />
    </main>
  )
}

export default App
