import { useRef } from 'react'
import { TierMakerForm } from './tier-maker-form'
import { TierMakerRow } from './tier-maker-row'
import { useTierMakerStore } from './tier-maker-store'
import { Toaster } from './toast'

function App() {
  const tiersRef = useRef<HTMLUListElement>(null)
  const tiers = useTierMakerStore(state => state.tiers)

  return (
    <>
      <main className='flex flex-col h-screen'>
        <header className='flex p-2'>
          <img src='/logo.png' className='aspect-[200/37] w-40' />
        </header>
        <ul ref={tiersRef} className='*:border-t'>
          {tiers.map(tier => (
            <li key={tier.id} className='last:border-b'>
              <TierMakerRow
                tier={tier}
              />
            </li>
          ))}
        </ul>
        <TierMakerForm tiersRef={tiersRef} />
      </main>
      <Toaster />
    </>
  )
}

export default App
