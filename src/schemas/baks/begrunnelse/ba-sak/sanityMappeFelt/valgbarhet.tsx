import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';
import { Begrunnelse } from '../typer';

export enum Valgbarhet {
  STANDARD = 'STANDARD',
  AUTOMATISK = 'AUTOMATISK',
  TILLEGGSTEKST = 'TILLEGGSTEKST',
  SAKSPESIFIKK = 'SAKSPESIFIKK',
}

export const erSakspesifikkBegrunnelse = (begrunnelse: Begrunnelse) =>
  begrunnelse[BegrunnelseDokumentNavn.VALGBARHET] &&
  begrunnelse[BegrunnelseDokumentNavn.VALGBARHET] === Valgbarhet.SAKSPESIFIKK;

export const valgbarhetTilMenyValg = (valgbarhet: Valgbarhet): Menyvalg<Valgbarhet> => {
  const valgbarhetTilMenynavn = (valgbarhet: Valgbarhet): string => {
    switch (valgbarhet) {
      case Valgbarhet.AUTOMATISK:
        return 'Automatisk';
      case Valgbarhet.STANDARD:
        return 'Standard';
      case Valgbarhet.TILLEGGSTEKST:
        return 'Tilleggstekst';
      case Valgbarhet.SAKSPESIFIKK:
        return 'Sakspesifikk';
    }
  };

  return { title: valgbarhetTilMenynavn(valgbarhet), value: valgbarhet };
};

export const valgbarhet = {
  title: 'Valgbarhet',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.VALGBARHET,
  options: {
    list: Object.values(Valgbarhet).map(valgbarhet => valgbarhetTilMenyValg(valgbarhet)),
  },
  validation: rule => rule.required().error('Valgbarhet ikke satt'),
};
