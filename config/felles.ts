import client from 'part:@sanity/base/client';

import { BegrunnelseDokumentNavn, DokumentNavn, EØSRegelsettDokumentNavn } from '../src/util/typer';

export const ekskluderesForEf: string[] = [
  DokumentNavn.DELMAL,
  DokumentNavn.DOKUMENT,
  DokumentNavn.PERIODE,
  BegrunnelseDokumentNavn.BEGRUNNELSE,
  EØSRegelsettDokumentNavn.EØS_REGELSETT,
];

export const ekskluderesForBa: string[] = [
  DokumentNavn.AVANSERT_DELMAL,
  DokumentNavn.AVANSERT_DOKUMENT,
];

const { dataset } = client.config();

export const erEf = () => ['ef-brev', 'ef-test', 'testdata'].includes(dataset);
export const erBa = () => ['ba-brev', 'ba-test', 'testdata'].includes(dataset);
