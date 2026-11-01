import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import { createNodeWebSocket } from '@hono/node-ws'
import type { WSContext } from 'hono/ws'

type Sound = {
  id: string;
  name: string;
  file: string;
  image: string
}

const sounds: Sound[] = [
  { id: 'weird_route', name: 'WEIRD ROUTE', file: '/sounds/weird_route.mp3', image: '/images/weird_route.png'  },
  { id: 'huuuh', name: 'HUUH', file: '/sounds/huuuh.mp3', image: '/images/huuuh.png'  },
  { id: 'sega_in_diretta', name: 'SEGA IN DIRETTA', file: '/sounds/sega_in_diretta.mp3', image: '/images/sega_in_diretta.png' },
  { id: 'mussolini_frocio', name: 'MUSSOLINI FROCIO', file: '/sounds/mussolini_frocio.mp3', image: '/images/mussolini_frocio.png'  },
]

const app = new Hono()
app.use('/api/*', cors())

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

const clients = new Set<WSContext>()

app.get('/ws', upgradeWebSocket((c) => {
  return {
    onOpen(_evt, ws) {
      clients.add(ws)
      console.log(`ws client connected (${clients.size})`)
    },
    onMessage(msg, ws) {
      const event = JSON.parse(msg.data.toString()) as { type: string; id?: string }
      if (event.type !== 'play' || !event.id) return
      const sound = sounds.find((s) => s.id === event.id)
      if (!sound) return

      const payload = JSON.stringify({ type: 'play', file: sound.file })
      for (const client of clients) {
        if (client !== ws) client.send(payload)
      }
    },
    onClose(_evt, ws) { clients.delete(ws) }
  }
}))

app.get('/api/sounds', (c) => c.json(sounds))

app.use('/sounds/*', serveStatic({ root: './public' }))
app.use('/images/*', serveStatic({ root: './public' }))

const server = serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`API on http://localhost:${info.port}`)
})

injectWebSocket(server)
