export function Header({ title }: { title: string }) {
  return (
    <header style={{
      borderBottom: '2px solid #333',
      padding: '1rem'
    }}>
      <h1>{title}</h1>
    </header>
  )
}
