import { TLF } from './tlf'
import { useTierList } from './tlh'
import { TLR } from './tlr'

const tiers = [
  { label: 'S', className: 'bg-red-400' },
  { label: 'A', className: 'bg-orange-800' },
  { label: 'B', className: 'bg-orange-300' },
  { label: 'C', className: 'bg-yellow-400' },
  { label: 'D', className: 'bg-green-500' },
]

function App() {
  const { items, draggingItem, tiersRef, setDraggingItem, load, asign, reset, unasignAll } = useTierList()

  return (
    <main className='flex flex-col h-screen'>
      <header className='flex p-2'>
        <img src='/logo.png' className='aspect-[200/37] w-40' />
      </header>
      <ul ref={tiersRef} className='*:border-t'>
        {tiers.map(({ label, className }) => (
          <li key={label} className='last:border-b'>
            <TLR asign={asign} tier={label} items={items} draggingItem={draggingItem} setDraggingItem={setDraggingItem} label={label} labelClassName={className} />
          </li>
        ))}
      </ul>
      <TLF unasignAll={unasignAll} asign={asign} reset={reset} load={load} items={items} draggingItem={draggingItem} tiersRef={tiersRef} setDraggingItem={setDraggingItem} />
    </main>
  )
}

export default App
