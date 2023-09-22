import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';
import { Rule } from 'sanity';

export enum PeriodeType {
  UTBETALING = 'UTBETALING',
  INGEN_UTBETALING = 'INGEN_UTBETALING',
  INGEN_UTBETALING_UTEN_PERIODE = 'INGEN_UTBETALING_UTEN_PERIODE',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
}

export const periodeTypeTilMenyValg = (periodeType: PeriodeType): Menyvalg<PeriodeType> => {
  const periodeTypeTilMenynavn = (periodeType: PeriodeType): string => {
    switch (periodeType) {
      case PeriodeType.UTBETALING:
        return 'Utbetaling';
      case PeriodeType.INGEN_UTBETALING:
        return 'Ingen utbetaling';
      case PeriodeType.INGEN_UTBETALING_UTEN_PERIODE:
        return 'Ingen utbetaling uten periode';
      case PeriodeType.FORTSATT_INNVILGET:
        return 'Fortsatt innvilget';
    }
  };

  return { title: periodeTypeTilMenynavn(periodeType), value: periodeType };
};

const title = 'Periodetype';
export const periodeType = {
  title: title,
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.PERIODE_TYPE,
  options: {
    list: Object.values(PeriodeType).map(vedtakPeriodeType =>
      periodeTypeTilMenyValg(vedtakPeriodeType),
    ),
  },
  validation: (rule: Rule) => rule.required().error(`${title} er ikke valgt`),
};
