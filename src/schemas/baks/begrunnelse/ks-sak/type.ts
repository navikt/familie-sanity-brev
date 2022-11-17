import { KSBegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';

export enum Type {
  STANDARD = 'STANDARD',
  TILLEGGSTEKST = 'TILLEGGSTEKST',
  ENDRINGSPERIODE = 'ENDRINGSPERIODE',
}

export const typeValg: Record<Type, { title: string; value: Type }> = {
  STANDARD: { title: 'Standard', value: Type.STANDARD },
  TILLEGGSTEKST: {
    title: 'Tilleggstekst',
    value: Type.TILLEGGSTEKST,
  },
  ENDRINGSPERIODE: { title: 'Endringsperiode', value: Type.ENDRINGSPERIODE },
};

export const type = {
  title: 'Type',
  type: SanityTyper.STRING,
  name: KSBegrunnelseDokumentNavn.TYPE,
  options: {
    list: Object.values(Type).map(type => typeValg[type]),
  },
  validation: rule => rule.required().error('Type ikke valgt'),
};
