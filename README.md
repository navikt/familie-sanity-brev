# Familie sanity brev

### Kjøre lokalt
* Kjør `nvm use` (Node-versjonen ligger i `.nvmrc`).
* Aktiver riktig pnpm-versjon med `corepack enable` (henter versjonen fra `packageManager` i package.json).
* Kjør `pnpm install` for å installere alle npm-pakkene.
* Kjør `pnpm dev` for å starte applikasjonen på `http://localhost:3333/`.
* Sanity-CLI-en kjøres via repoet: `pnpm exec sanity <kommando>` (ikke installer `@sanity/cli` globalt).

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.