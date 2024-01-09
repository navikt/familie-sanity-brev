import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';
import { Rule } from 'sanity';

export enum BrevPeriodetype {
  UTBETALING = 'UTBETALING',
  INGEN_UTBETALING = 'INGEN_UTBETALING',
  INGEN_UTBETALING_UTEN_PERIODE = 'INGEN_UTBETALING_UTEN_PERIODE',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
  IKKE_RELEVANT = 'IKKE_RELEVANT',
}

export const brevPeriodeTypeTilMenyValg = (
  brevPeriodeType: BrevPeriodetype,
): Menyvalg<BrevPeriodetype> => {
  const brevPeriodeTypeTilMenynavn = (brevPeriodeType: BrevPeriodetype): string => {
    switch (brevPeriodeType) {
      case BrevPeriodetype.UTBETALING:
        return 'Utbetaling';
      case BrevPeriodetype.INGEN_UTBETALING:
        return 'Ingen utbetaling';
      case BrevPeriodetype.INGEN_UTBETALING_UTEN_PERIODE:
        return 'Ingen utbetaling uten periode';
      case BrevPeriodetype.FORTSATT_INNVILGET:
        return 'Fortsatt innvilget';
      case BrevPeriodetype.IKKE_RELEVANT:
        return 'Ikke relevant';
    }
  };

  return { title: brevPeriodeTypeTilMenynavn(brevPeriodeType), value: brevPeriodeType };
};

const title = 'BrevPeriodetype';
export const brevPeriodeType = {
  title: title,
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.BREV_PERIODE_TYPE,
  options: {
    list: Object.values(BrevPeriodetype).map(brevPeriodeType =>
      brevPeriodeTypeTilMenyValg(brevPeriodeType),
    ),
  },
  validation: (rule: Rule) => rule.required().error(`${title} er ikke valgt`),
};
