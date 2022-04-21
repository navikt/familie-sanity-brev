import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import {
  endretUtbetalingsperioderDeltBostedTriggereValg,
  endretUtbetalingsperioderDeltBostedTriggereValgUtbetaling,
  Endringsårsak,
} from '../typer';

const erEndretUtbetalingAvTypeDeltBosted = document =>
  document[BegrunnelseDokumentNavn.ENDRINGSAARSAKER] &&
  document[BegrunnelseDokumentNavn.ENDRINGSAARSAKER].includes(Endringsårsak.DELT_BOSTED);

export const endretUtbetalingsperiodeDeltBostedUtbetalingTrigger = {
  title: 'Endret utbetalingsperiode - delt bosted: Skal perioden utbetales?',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_DELT_BOSTED_UTBETALING_TRIGGER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderDeltBostedTriggereValgUtbetaling,
    layout: 'radio',
  },
  hidden: ({ document }) => !erEndretUtbetalingAvTypeDeltBosted(document),
  validation: rule =>
    rule.custom((currentValue, { document }) => {
      if (erEndretUtbetalingAvTypeDeltBosted(document) && currentValue === undefined) {
        return 'Du må krysse av for et alternativ';
      }
      return true;
    }),
};

export const endretUtbetalingsperiodeDeltBostedTriggere = {
  title: 'Endret utbetalingsperiode triggere for delt bosted.',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_DELT_BOSTED_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderDeltBostedTriggereValg,
  },
  hidden: ({ document }) => !erEndretUtbetalingAvTypeDeltBosted(document),
};
