import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';

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

export const begrunnelsestyperTilMenyValg = (
  begrunnelsestype: Begrunnelsestype,
): Menyvalg<Begrunnelsestype> => {
  const begrunnelsestypeTilMenynavn = (begrunnelsestype: Begrunnelsestype): string => {
    switch (begrunnelsestype) {
      case Begrunnelsestype.INNVILGET:
        return 'Innvilget';
      case Begrunnelsestype.REDUKSJON:
        return 'Reduksjon';
      case Begrunnelsestype.AVSLAG:
        return 'Avslag';
      case Begrunnelsestype.OPPHØR:
        return 'Opphør';
      case Begrunnelsestype.FORTSATT_INNVILGET:
        return 'Fortsatt innvilget';
      case Begrunnelsestype.ENDRET_UTBETALINGSPERIODE:
        return 'Endret utbetaling';
      case Begrunnelsestype.ETTER_ENDRET_UTBETALINGSPERIODE:
        return 'Etter endret utbetaling';
    }
  };

  return { title: begrunnelsestypeTilMenynavn(begrunnelsestype), value: begrunnelsestype };
};

/**
 * @deprecated Skal bruke begrunnelseTema. Enn så lenge trenger vi denne for å vise riktige tiggere for endret utbetalingsperioder.
 */
export const begunnelseType = {
  title: 'Begrunnelsetype',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE,
  options: {
    list: Object.values(Begrunnelsestype).map(begrunnelsestype =>
      begrunnelsestyperTilMenyValg(begrunnelsestype),
    ),
  },
  validation: rule => rule.required().error('Begrunnelsestype ikke valgt'),
};
