# Familie sanity brev

### Kjøre lokalt
* Kjør `nvm use` (Node-versjonen ligger i `.nvmrc`).
* Aktiver riktig pnpm-versjon med `corepack enable` (henter versjonen fra `packageManager` i package.json).
* Kjør `pnpm install` for å installere alle npm-pakkene.
* Kjør `pnpm dev` for å starte applikasjonen på `http://localhost:3333/`.
* Sanity-CLI-en kjøres via repoet: `pnpm exec sanity <kommando>` (ikke installer `@sanity/cli` globalt).

### Utvikling
* Vi bruker [Biome](https://biomejs.dev/) til linting og formatering. Kjør `pnpm check` for å sjekke og `pnpm check:fix` for å rette opp. `pnpm validate` kjører typesjekk og Biome, slik som i CI.
* Pre-commit-hooken (husky + lint-staged) kjører `biome check .` på hele repoet uten å endre filer, og stopper commiten hvis Biome finner feil.

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.