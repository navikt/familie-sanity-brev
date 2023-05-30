import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';

export enum VedtakResultat {
  INNVILGET_ELLER_ØKNING = 'INNVILGET_ELLER_ØKNING',
  REDUKSJON = 'REDUKSJON',
  IKKE_INNVILGET = 'IKKE_INNVILGET',
  INGEN_ENDRING = 'INGEN_ENDRING',
}

export const vedtakResultatTilMenynavn: Record<
  VedtakResultat,
  {
    title: string;
    value: VedtakResultat;
  }
> = {
  INNVILGET_ELLER_ØKNING: {
    title: 'Innvilget eller økning',
    value: VedtakResultat.INNVILGET_ELLER_ØKNING,
  },
  REDUKSJON: { title: 'Reduksjon', value: VedtakResultat.REDUKSJON },
  IKKE_INNVILGET: { title: 'Ikke innvilget', value: VedtakResultat.IKKE_INNVILGET },
  INGEN_ENDRING: { title: 'Ingen endring', value: VedtakResultat.INGEN_ENDRING },
};

export const vedtakResultat = {
  title: 'Resultat',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.VEDTAK_RESULTAT,
  options: {
    list: Object.values(VedtakResultat).map(
      vedtakResultat => vedtakResultatTilMenynavn[vedtakResultat],
    ),
  },
  validation: rule => rule.required().error('VedtakResultat ikke valgt'),
};
