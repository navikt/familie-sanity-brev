import {
  BegrunnelseDokumentNavn,
  DokumentNavn,
  KSBegrunnelseDokumentNavn,
} from '../src/util/typer';

export const ekskluderesForEf: string[] = [
  DokumentNavn.DELMAL,
  DokumentNavn.DOKUMENT,
  DokumentNavn.PERIODE,
  DokumentNavn.UTBETALINGER,
  BegrunnelseDokumentNavn.BA_BEGRUNNELSE,
  KSBegrunnelseDokumentNavn.KS_BEGRUNNELSE,
];

export const ekskluderesForBa: string[] = [
  DokumentNavn.AVANSERT_DELMAL,
  DokumentNavn.AVANSERT_DOKUMENT,
  KSBegrunnelseDokumentNavn.KS_BEGRUNNELSE,
];

export const ekskluderesForKs: string[] = [
  DokumentNavn.AVANSERT_DELMAL,
  DokumentNavn.AVANSERT_DOKUMENT,
  BegrunnelseDokumentNavn.BA_BEGRUNNELSE,
];

const hentDataset = () => window.location.pathname.split('/')[1];

export const erEf = () => ['ef-brev', 'ef-test', 'testdata'].includes(hentDataset());
export const erBa = () => ['ba-brev', 'ba-test', 'testdata'].includes(hentDataset());
export const erKs = () => ['ks-brev', 'ks-test', 'testdata'].includes(hentDataset());
