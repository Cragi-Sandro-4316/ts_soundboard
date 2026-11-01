// components/PageLayout.tsx
import type { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Header title="Soundboard" />
      <div style={{ display: 'flex' }}>
        <Sidebar items={['sounds', 'uploads', 'about']} />
        <main style={{ padding: '1rem' }}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}
