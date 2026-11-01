'use client'

import { useEffect, useRef, useState } from 'react'

type Sound = { id: string; name: string; file: string, image: string }

export default function Remote() {
  const [sounds, setSounds] = useState<Sound[] | null>(null)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    fetch('/api/sounds')
      .then((res) => res.json())
      .then(setSounds)
      .catch(console.error)

    const sock = new WebSocket(`ws://${window.location.hostname}:3001/ws`)
    ws.current = sock
    return () => sock.close()
  }, [])

  const trigger = (id: string) => ws.current?.send(JSON.stringify({ type: 'play', id }))

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem', maxWidth: '480px', margin: '0 auto', width: '100%', height: '100%' }}>
      {sounds === null ? (
        <p>Loading…</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',   // two equal columns → items flow in PAIRS
            gap: '8px',
            width: '100%',
            height: '100%',
            borderWidth: '3px',
            borderColor: 'white',
          }}
        >
          {sounds.map((s) => (
            <div
              key={s.id}
              onClick={() => trigger(s.id)}
              style={{
                padding: '33%',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                backgroundImage: `url(${s.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                width: '33%',
                height: '33%',
                borderWidth: '2px',
                borderColor: 'purple',
              }}
            >

              {/*<img
                src={s.image}
                alt={s.name}
                style={{ width: '100%', display: 'block', borderRadius: '8px' }}
              />*/}


            </div>
          ))}
        </div>
      )}
    </div>
  )
}
