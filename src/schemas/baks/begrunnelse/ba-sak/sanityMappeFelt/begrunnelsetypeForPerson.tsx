import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';

export enum BegrunnelsestypeForPerson {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
  ENDRET_UTBETALINGSPERIODE = 'ENDRET_UTBETALINGSPERIODE',
  ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
}

export const begrunnelsestyperTilMenyValg = (
  begrunnelsestype: BegrunnelsestypeForPerson,
): Menyvalg<BegrunnelsestypeForPerson> => {
  const begrunnelsestypeTilMenynavn = (begrunnelsestype: BegrunnelsestypeForPerson): string => {
    switch (begrunnelsestype) {
      case BegrunnelsestypeForPerson.INNVILGET:
        return 'Innvilget';
      case BegrunnelsestypeForPerson.REDUKSJON:
        return 'Reduksjon';
      case BegrunnelsestypeForPerson.AVSLAG:
        return 'Avslag';
      case BegrunnelsestypeForPerson.OPPHØR:
        return 'Opphør';
      case BegrunnelsestypeForPerson.FORTSATT_INNVILGET:
        return 'Fortsatt innvilget';
      case BegrunnelsestypeForPerson.ENDRET_UTBETALINGSPERIODE:
        return 'Endret utbetaling';
      case BegrunnelsestypeForPerson.ETTER_ENDRET_UTBETALINGSPERIODE:
        return 'Etter endret utbetaling';
    }
  };

  return { title: begrunnelsestypeTilMenynavn(begrunnelsestype), value: begrunnelsestype };
};

export const begunnelseTypeForPerson = {
  title: 'BegrunnelsetypeForPerson',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE_FOR_PERSON,
  options: {
    list: Object.values(BegrunnelsestypeForPerson).map(begrunnelsestype =>
      begrunnelsestyperTilMenyValg(begrunnelsestype),
    ),
  },
  validation: rule => rule.required().error('Begrunnelsestype ikke valgt'),
};
