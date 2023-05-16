import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
export enum Valgbarhet {
  STANDARD = 'STANDARD',
  AUTOMATISK = 'AUTOMATISK',
  TILLEGGSTEKST = 'TILLEGGSTEKST',
}

export const valgbarhetTilMenynavn: Record<
  Valgbarhet,
  {
    title: string;
    value: Valgbarhet;
  }
> = {
  AUTOMATISK: { title: 'Automatisk', value: Valgbarhet.AUTOMATISK },
  STANDARD: { title: 'Standard', value: Valgbarhet.STANDARD },
  TILLEGGSTEKST: { title: 'Tilleggstekst', value: Valgbarhet.TILLEGGSTEKST },
};

export const valgbarhet = {
  title: 'Valgbarhet',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.VALGBARHET,
  options: {
    list: Object.values(Valgbarhet).map(valgbarhet => valgbarhetTilMenynavn[valgbarhet]),
  },
  validation: rule => rule.required().error('Valgbarhet ikke satt'),
};
