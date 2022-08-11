import client from 'part:@sanity/base/client';

import { DokumentNavn } from '../src/util/typer';

export const ekskluderesForEf: string[] = [
  DokumentNavn.DELMAL,
  DokumentNavn.DOKUMENT,
  DokumentNavn.PERIODE,
];

const { dataset } = client.config();

export const erEf = () => dataset === 'ef-brev';
