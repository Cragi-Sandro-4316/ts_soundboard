export function Sidebar({ items }: { items: string[] }) {
  return (
    <nav style={{ width: '140px', padding: '1rem' }}>
      {items.map(item => <a key={item} href={`/${item}`} style={{ display: 'block' }}>{item}</a>)}
    </nav>
  )
}
