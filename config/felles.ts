import {
  BegrunnelseDokumentNavn,
  DokumentNavn,
  KSBegrunnelseDokumentNavn,
} from '../src/util/typer';

export const ekskluderesForEf: string[] = [
  DokumentNavn.DELMAL,
  DokumentNavn.DOKUMENT,
  DokumentNavn.PERIODE,
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

const dataset = window.location.pathname.split('/')[1];

export const erEf = () => ['ef-brev', 'ef-test', 'testdata'].includes(dataset);
export const erBa = () => ['ba-brev', 'ba-test', 'testdata'].includes(dataset);
export const erKs = () => ['ks-brev', 'ks-test', 'testdata'].includes(dataset);
