import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { endretUtbetalingsperioderDeltBostedTriggereValgUtbetaling, Endringsårsak } from '../typer';
import { erEøsBegrunnelse } from '../EØSTriggere/utlis';
import { hentNasjonaleTriggereRegler } from './utils';

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
  hidden: ({ document }) =>
    !erEndretUtbetalingAvTypeDeltBosted(document) || erEøsBegrunnelse(document),
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
