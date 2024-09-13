import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';

export enum BegrunnelseType {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
  ENDRET_UTBETALING = 'ENDRET_UTBETALING',
  ETTER_ENDRET_UTBETALING = 'ETTER_ENDRET_UTBETALING',
}

export const begrunnelseTyperTilMenyValg = (
  begrunnelseType: BegrunnelseType,
): Menyvalg<BegrunnelseType> => {
  const begrunnelsestypeTilMenynavn = (begrunnelsestype: BegrunnelseType): string => {
    switch (begrunnelsestype) {
      case BegrunnelseType.INNVILGET:
        return 'Innvilget';
      case BegrunnelseType.REDUKSJON:
        return 'Reduksjon';

      case BegrunnelseType.AVSLAG:
        return 'Avslag';
      case BegrunnelseType.OPPHØR:
        return 'Opphør';
      case BegrunnelseType.FORTSATT_INNVILGET:
        return 'Fortsatt innvilget';
      case BegrunnelseType.ENDRET_UTBETALING:
        return 'Endret utbetaling';
      case BegrunnelseType.ETTER_ENDRET_UTBETALING:
        return 'Etter endret utbetaling';
    }
  };

  return { title: begrunnelsestypeTilMenynavn(begrunnelseType), value: begrunnelseType };
};

export const begrunnelseType = {
  title: 'BegrunnelseType',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE,
  options: {
    list: Object.values(BegrunnelseType).map(begrunnelseType =>
      begrunnelseTyperTilMenyValg(begrunnelseType),
    ),
  },
  validation: rule => rule.required().error('Begrunnelsestype ikke valgt'),
};
