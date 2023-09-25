import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { endretUtbetalingsperioderDeltBostedTriggereValgUtbetaling, Endringsårsak } from '../typer';
import { hentNasjonaleTriggereRegler, erNasjonalBegrunnelse } from './utils';

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
  },
  hidden: ({ document }) =>
    !erEndretUtbetalingAvTypeDeltBosted(document) || !erNasjonalBegrunnelse(document),
  validation: rule => [
    rule.custom((currentValue, { document }) => {
      if (erEndretUtbetalingAvTypeDeltBosted(document) && currentValue === undefined) {
        return 'Du må krysse av for et alternativ';
      }
      return true;
    }),
    hentNasjonaleTriggereRegler(rule),
  ],
};
