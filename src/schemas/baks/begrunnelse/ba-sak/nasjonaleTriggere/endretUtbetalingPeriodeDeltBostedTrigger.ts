import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import {
  Begrunnelse,
  NasjonalBegrunnelse,
  endretUtbetalingsperioderDeltBostedTriggereValgUtbetaling,
  Endringsårsak,
} from '../typer';
import { hentNasjonaleTriggereRegler, erNasjonalBegrunnelse } from './utils';
import { Rule } from 'sanity';

const erEndretUtbetalingAvTypeDeltBosted = (document: Begrunnelse) => {
  const nasjonalDoc = document as NasjonalBegrunnelse;
  return (
    nasjonalDoc[BegrunnelseDokumentNavn.ENDRINGSAARSAKER] &&
    nasjonalDoc[BegrunnelseDokumentNavn.ENDRINGSAARSAKER].includes(Endringsårsak.DELT_BOSTED)
  );
};

export const endretUtbetalingsperiodeDeltBostedUtbetalingTrigger = {
  title: 'Endret utbetalingsperiode - delt bosted: Skal perioden utbetales?',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_DELT_BOSTED_UTBETALING_TRIGGER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderDeltBostedTriggereValgUtbetaling,
  },
  hidden: ({ document }: { document: Begrunnelse }) =>
    !erEndretUtbetalingAvTypeDeltBosted(document) || !erNasjonalBegrunnelse(document),
  validation: (rule: Rule) => [
    rule.custom((currentValue, { document }) => {
      if (
        erEndretUtbetalingAvTypeDeltBosted(document as Begrunnelse) &&
        currentValue === undefined
      ) {
        return 'Du må krysse av for et alternativ';
      }
      return true;
    }),
    hentNasjonaleTriggereRegler(rule),
  ],
};
