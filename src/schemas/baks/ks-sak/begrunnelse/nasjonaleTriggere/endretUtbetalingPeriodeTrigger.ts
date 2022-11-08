import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { endretUtbetalingsperioderTriggereValg } from '../typer';
import { erEndretUtbetaling } from './endringsårsakTrigger';
import { hentNasjonaleTriggereRegler, erNasjonalBegrunnelse } from './utils';

export const endretUtbetalingsperiodeTriggere = {
  title: 'Endret utbetalingsperiode triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderTriggereValg,
  },
  hidden: ({ document }) => !erEndretUtbetaling(document) || !erNasjonalBegrunnelse(document),
  validation: rule => hentNasjonaleTriggereRegler(rule),
};
