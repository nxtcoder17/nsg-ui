/**
 * The docs site serves repo-root artifacts at their REAL repo paths, so the URL a
 * user pastes into `curl` is literally where the file lives:
 *
 *   skills/<name>/SKILL.md          ->  /skills/<name>/SKILL.md
 *   dist/standalone/<name>.css      ->  /assets/<name>.css
 *   dist/standalone/<name>.min.css  ->  /assets/<name>.min.css
 *
 * Both are pulled from the repo root into `public/` at build time, and this is the
 * only place those copies are written — there is never a second, hand-edited copy
 * to drift.
 *
 * The library build must run first: `dist/standalone/` is what `bun run build` (at
 * the repo root) emits, and the CI deploy does exactly that before the site build.
 * If it is missing locally the script warns rather than failing, so a dev server
 * still starts; the `/assets/*.css` URLs simply 404 until the library is built.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..', '..')
const publicDir = join(here, '..', 'public')

// --- agent skills: skills/<name>/SKILL.md -> /skills/<name>/SKILL.md ----------
const skillsSrc = join(repoRoot, 'skills')
const skillsOut = join(publicDir, 'skills')
rmSync(skillsOut, { recursive: true, force: true })
const skillNames = []
for (const entry of readdirSync(skillsSrc)) {
	const skill = join(skillsSrc, entry, 'SKILL.md')
	try {
		if (!statSync(skill).isFile()) continue
	} catch {
		continue
	}
	skillNames.push(entry)
	mkdirSync(join(skillsOut, entry), { recursive: true })
	copyFileSync(skill, join(skillsOut, entry, 'SKILL.md'))
}

// Drop the legacy flattened copies (`/<name>/SKILL.md`) from before the move to
// `/skills/<name>/SKILL.md`, so the old URL 404s instead of serving a stale file.
for (const entry of skillNames) rmSync(join(publicDir, entry), { recursive: true, force: true })

// --- compiled foundations: dist/standalone/*.css -> /assets/*.css -------------
const standaloneSrc = join(repoRoot, 'dist', 'standalone')
const assetsOut = join(publicDir, 'assets')
rmSync(assetsOut, { recursive: true, force: true })
if (!existsSync(standaloneSrc)) {
	console.warn(
		'[sync-public] dist/standalone is missing — run `bun run build` at the repo root first, ' +
			'or the /assets/*.css URLs will 404.',
	)
} else {
	mkdirSync(assetsOut, { recursive: true })
	for (const file of readdirSync(standaloneSrc)) {
		if (!file.endsWith('.css')) continue
		copyFileSync(join(standaloneSrc, file), join(assetsOut, file))
	}
}
