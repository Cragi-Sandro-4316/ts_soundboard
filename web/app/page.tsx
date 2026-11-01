'use client'

import { useEffect, useRef, useState } from 'react'

export default function Player() {
  const [armed, setArmed] = useState(false)
  const volume = useRef(0.5)   // ← NOT useState. Read why below — this is the whole lesson.

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.hostname}:3001/ws`)
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data) as { type: string; file: string }
      if (msg.type !== 'play') return
      const audio = new Audio(msg.file)
      audio.volume = volume.current     // volume as of RIGHT NOW, not as of page load
      audio.play()
    }
    return () => ws.close()
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {!armed ? (
        <button onClick={() => setArmed(true)} style={{ fontSize: '24px', padding: '20px 40px' }}>
          🔊 ARM PLAYER
        </button>
      ) : (
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.5}
          onChange={(e) => { volume.current = Number(e.target.value) }}
          style={{ width: '300px' }}
        />
      )}
    </div>
  )
}
