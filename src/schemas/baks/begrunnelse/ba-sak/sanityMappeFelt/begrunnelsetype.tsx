import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';

/**
 * @deprecated Skal bruke begrunnelseTema. Enn så lenge trenger vi denne for å vise riktige tiggere for endret utbetalingsperioder.
 */
export enum Begrunnelsestype {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
  ENDRET_UTBETALINGSPERIODE = 'ENDRET_UTBETALINGSPERIODE',
  ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
}

export const begrunnelsestyperTilMenynavn: Record<
  Begrunnelsestype,
  { title: string; value: Begrunnelsestype }
> = {
  INNVILGET: { title: 'Innvilget', value: Begrunnelsestype.INNVILGET },
  REDUKSJON: { title: 'Reduksjon', value: Begrunnelsestype.REDUKSJON },
  AVSLAG: { title: 'Avslag', value: Begrunnelsestype.AVSLAG },
  OPPHØR: { title: 'Opphør', value: Begrunnelsestype.OPPHØR },
  FORTSATT_INNVILGET: { title: 'Fortsatt innvilget', value: Begrunnelsestype.FORTSATT_INNVILGET },
  ENDRET_UTBETALINGSPERIODE: {
    title: 'Endret utbetaling',
    value: Begrunnelsestype.ENDRET_UTBETALINGSPERIODE,
  },
  ETTER_ENDRET_UTBETALINGSPERIODE: {
    title: 'Etter endret utbetaling',
    value: Begrunnelsestype.ETTER_ENDRET_UTBETALINGSPERIODE,
  },
};

/**
 * @deprecated Skal bruke begrunnelseTema. Enn så lenge trenger vi denne for å vise riktige tiggere for endret utbetalingsperioder.
 */
export const begunnelseType = {
  title: 'Begrunnelsetype',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE,
  options: {
    list: Object.values(Begrunnelsestype).map(
      begrunnelsestype => begrunnelsestyperTilMenynavn[begrunnelsestype],
    ),
  },
  validation: rule => rule.required().error('Begrunnelsestype ikke valgt'),
};
