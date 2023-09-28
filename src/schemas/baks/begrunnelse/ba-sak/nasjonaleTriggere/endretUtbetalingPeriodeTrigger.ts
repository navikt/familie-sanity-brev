import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { endretUtbetalingsperioderTriggereValg } from '../typer';
import { erEndretUtbetalingBegrunnelse } from './endringsårsakTrigger';
import { hentNasjonaleTriggereRegler, erNasjonalBegrunnelse } from './utils';

export const endretUtbetalingsperiodeTriggere = {
  title: 'Endret utbetalingsperiode triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderTriggereValg,
  },
  hidden: ({ document }) =>
    !erEndretUtbetalingBegrunnelse(document) || !erNasjonalBegrunnelse(document),
  validation: rule => hentNasjonaleTriggereRegler(rule),
};
