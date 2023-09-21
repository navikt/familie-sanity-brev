import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';
import { Rule } from 'sanity';

export enum VedtakPeriodeType {
  UTBETALING = 'UTBETALING',
  INGEN_UTBETALING = 'INGEN_UTBETALING',
  INGEN_UTBETALING_UTEN_PERIODER = 'INGEN_UTBETALING_UTEN_PERIODER',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
}

export const vedtakPeriodeTypeTilMenyValg = (
  vedtakPeriodeType: VedtakPeriodeType,
): Menyvalg<VedtakPeriodeType> => {
  const vedtakPeriodeTypeTilMenynavn = (vedtakPeriodeType: VedtakPeriodeType): string => {
    switch (vedtakPeriodeType) {
      case VedtakPeriodeType.UTBETALING:
        return 'Utbetaling';
      case VedtakPeriodeType.INGEN_UTBETALING:
        return 'Ingen utbetaling';
      case VedtakPeriodeType.INGEN_UTBETALING_UTEN_PERIODER:
        return 'Ingen utbetaling uten perioder';
      case VedtakPeriodeType.FORTSATT_INNVILGET:
        return 'Fortsatt innvilget';
    }
  };

  return { title: vedtakPeriodeTypeTilMenynavn(vedtakPeriodeType), value: vedtakPeriodeType };
};

const title = 'Vedtakperiodetype';
export const vedtakPeriodeType = {
  title: title,
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.VEDTAK_PERIODE_TYPE,
  options: {
    list: Object.values(VedtakPeriodeType).map(vedtakPeriodeType =>
      vedtakPeriodeTypeTilMenyValg(vedtakPeriodeType),
    ),
  },
  validation: (rule: Rule) => rule.required().error(`${title} er ikke valgt`),
};
