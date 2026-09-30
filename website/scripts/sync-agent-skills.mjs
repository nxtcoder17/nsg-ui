/**
 * The agent skills live at the repo root in `skills/`, one directory per skill
 * with a `SKILL.md` — the canonical copy, next to the source it describes.
 *
 * The website serves them from `public/` so the docs can link to a real URL,
 * published at the same path the repo uses:
 *
 *   skills/<name>/SKILL.md  ->  /<name>/SKILL.md
 *
 * so the URL a user pastes into `curl` is the path the file actually lives at.
 * This is the only place those files are written.
 */
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const source = resolve(here, '..', '..', 'skills')
const target = join(here, '..', 'public')

for (const entry of readdirSync(source)) {
	const skill = join(source, entry, 'SKILL.md')
	try {
		if (!statSync(skill).isFile()) continue
	} catch {
		continue
	}
	const dir = join(target, entry)
	mkdirSync(dir, { recursive: true })
	copyFileSync(skill, join(dir, 'SKILL.md'))
}
