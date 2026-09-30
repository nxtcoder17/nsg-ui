/**
 * The LLM prompt files live at the repo root in `llm/` — one copy, next to the
 * source it describes, rather than two that can drift apart silently.
 *
 * The website serves them from `public/` so the docs can link to a real URL.
 * This copies them there on dev and build, and is the only place that file is
 * ever written, so editing `llm/*.txt` is always the correct thing to do.
 */
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const source = resolve(here, '..', '..', 'llm')
const target = join(here, '..', 'public')

mkdirSync(target, { recursive: true })

for (const file of readdirSync(source).filter((name) => name.endsWith('.txt'))) {
	copyFileSync(join(source, file), join(target, file))
}
