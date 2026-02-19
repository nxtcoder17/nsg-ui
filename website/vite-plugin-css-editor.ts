import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import type { Plugin } from 'vite'

export function nsgCssEditorPlugin(): Plugin {
  const overridesPath = resolve(__dirname, 'src/styles/overrides.css')

  return {
    name: 'nsg-css-editor',
    configureServer(server) {
      server.middlewares.use('/__nsg/css-editor', (req, res) => {
        if (req.method === 'GET') {
          const content = existsSync(overridesPath)
            ? readFileSync(overridesPath, 'utf-8')
            : ''
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ content }))
          return
        }
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: string) => { body += chunk })
          req.on('end', () => {
            const { content } = JSON.parse(body)
            writeFileSync(overridesPath, content, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          })
          return
        }
        res.statusCode = 405
        res.end()
      })
    }
  }
}
