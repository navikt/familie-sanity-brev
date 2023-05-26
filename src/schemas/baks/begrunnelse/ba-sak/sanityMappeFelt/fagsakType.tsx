import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';

export enum FagsakType {
  STANDARD = 'STANDARD',
  INSTITUSJON = 'INSTITUSJON',
  ENSLIG_MINDREÅRIG = 'ENSLIG_MINDREÅRIG',
}

export const fagsaktypeTilMenynavn: Record<
  FagsakType,
  {
    title: string;
    value: FagsakType;
  }
> = {
  STANDARD: { title: 'Standard', value: FagsakType.STANDARD },
  INSTITUSJON: { title: 'Tilleggstekst', value: FagsakType.INSTITUSJON },
  ENSLIG_MINDREÅRIG: { title: 'Sakspesifikk', value: FagsakType.ENSLIG_MINDREÅRIG },
};

export const fagsakType = {
  title: 'Fagsaktype',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.FAGSAK_TYPE,
  options: {
    list: Object.values(FagsakType).map(valgbarhet => fagsaktypeTilMenynavn[valgbarhet]),
  },
  validation: rule => rule.required().error('Fagsakttype ikke satt'),
};
