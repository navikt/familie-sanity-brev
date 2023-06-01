import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';

export enum VedtakResultat {
  INNVILGET_ELLER_ØKNING = 'INNVILGET_ELLER_ØKNING',
  REDUKSJON = 'REDUKSJON',
  IKKE_INNVILGET = 'IKKE_INNVILGET',
  INGEN_ENDRING = 'INGEN_ENDRING',
}

export const vedtakResultatTilMenyValg = (
  vedtakResultat: VedtakResultat,
): Menyvalg<VedtakResultat> => {
  const vedtakResultatTilMenynavn = (vedtakResultat: VedtakResultat): string => {
    switch (vedtakResultat) {
      case VedtakResultat.INNVILGET_ELLER_ØKNING:
        return 'Innvilget eller økning';
      case VedtakResultat.REDUKSJON:
        return 'Reduksjon';
      case VedtakResultat.INGEN_ENDRING:
        return 'Ingen endring';
      case VedtakResultat.IKKE_INNVILGET:
        return 'Ikke innvilget';
    }
  };

  return { title: vedtakResultatTilMenynavn(vedtakResultat), value: vedtakResultat };
};

export const vedtakResultat = {
  title: 'Resultat',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.VEDTAK_RESULTAT,
  options: {
    list: Object.values(VedtakResultat).map(vedtakResultat =>
      vedtakResultatTilMenyValg(vedtakResultat),
    ),
  },
  validation: rule => rule.required().error('VedtakResultat ikke valgt'),
};
