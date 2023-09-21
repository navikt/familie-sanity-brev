import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';
import { Rule } from 'sanity';

export enum PeriodeType {
  UTBETALING = 'UTBETALING',
  INGEN_UTBETALING = 'INGEN_UTBETALING',
  INGEN_UTBETALING_UTEN_PERIODER = 'INGEN_UTBETALING_UTEN_PERIODER',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
}

export const periodeTypeTilMenyValg = (periodeType: PeriodeType): Menyvalg<PeriodeType> => {
  const periodeTypeTilMenynavn = (periodeType: PeriodeType): string => {
    switch (periodeType) {
      case PeriodeType.UTBETALING:
        return 'Utbetaling';
      case PeriodeType.INGEN_UTBETALING:
        return 'Ingen utbetaling';
      case PeriodeType.INGEN_UTBETALING_UTEN_PERIODER:
        return 'Ingen utbetaling uten perioder';
      case PeriodeType.FORTSATT_INNVILGET:
        return 'Fortsatt innvilget';
    }
  };

  return { title: periodeTypeTilMenynavn(periodeType), value: periodeType };
};

export const periodeType = {
  title: 'Resultat',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.VEDTAK_RESULTAT,
  options: {
    list: Object.values(PeriodeType).map(periodeType => periodeTypeTilMenyValg(periodeType)),
  },
  validation: (rule: Rule) => rule.required().error('VedtakResultat ikke valgt'),
};
