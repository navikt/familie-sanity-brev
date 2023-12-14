import { KSBegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';

export enum Resultat {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
  ENDRET_UTBETALINGSPERIODE = 'ENDRET_UTBETALINGSPERIODE',
  ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
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
  ENDRET_UTBETALINGSPERIODE: {
    title: 'Endret utbetaling',
    value: Resultat.ENDRET_UTBETALINGSPERIODE,
  },
  ETTER_ENDRET_UTBETALINGSPERIODE: {
    title: 'Etter endret utbetaling',
    value: Resultat.ETTER_ENDRET_UTBETALINGSPERIODE,
  },
};

export const resultat = {
  title: 'Resultat',
  type: SanityTyper.STRING,
  name: KSBegrunnelseDokumentNavn.RESULTAT,
  options: {
    list: Object.values(Resultat).map(resultat => resultatValg[resultat]),
  },
  validation: rule => rule.required().error('Resultat ikke valgt'),
};
