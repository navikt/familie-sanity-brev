import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';

export enum Resultat {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
}

export const resultatValg: Record<Resultat, { title: string; value: Resultat }> = {
  INNVILGET: { title: 'Innvilget', value: Resultat.INNVILGET },
  REDUKSJON: {
    title: 'Reduksjon',
    value: Resultat.REDUKSJON,
  },
  AVSLAG: { title: 'Avslag', value: Resultat.AVSLAG },
  OPPHØR: { title: 'Opphør', value: Resultat.OPPHØR },
  FORTSATT_INNVILGET: { title: 'Fortsatt innvilget', value: Resultat.FORTSATT_INNVILGET },
};

export const resultat = {
  title: 'Resultat',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.BEGRUNNELSE_RESULTAT,
  options: {
    list: Object.values(Resultat).map(resultat => resultatValg[resultat]),
  },
  validation: rule => rule.required().error('Resultat ikke valgt'),
};
