import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';

export enum VedtakResultat {
  INNVILGELSE = 'INNVILGELSE',
  REDUKSJON = 'REDUKSJON',
  IKKE_INNVILGET = 'IKKE_INNVILGET',
}

export const vedtakResultatTilMenynavn: Record<
  VedtakResultat,
  {
    title: string;
    value: VedtakResultat;
  }
> = {
  IKKE_INNVILGET: { title: 'IkkeInnvilget', value: VedtakResultat.IKKE_INNVILGET },
  INNVILGELSE: { title: 'Innvilgelse', value: VedtakResultat.INNVILGELSE },
  REDUKSJON: { title: 'Reduksjon', value: VedtakResultat.REDUKSJON },
};

export const vedtakResultat = {
  title: 'Resultat',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.RESULTAT,
  options: {
    list: Object.values(VedtakResultat).map(
      vedtakResultat => vedtakResultatTilMenynavn[vedtakResultat],
    ),
  },
  validation: rule => rule.required().error('VedtakResultat ikke valgt'),
};
