import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../util/typer';
import { Begrunnelsestype, endretUtbetalingsperioderTriggereValg, endringsårsaker } from '../typer';
import { erEndretUtbetaling } from './endringsårsakTrigger';

export const endretUtbetalingsperiodeTriggere = {
  title: 'Endret utbetalingsperiode triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderTriggereValg,
  },
  hidden: ({ document }) => !erEndretUtbetaling(document),
};
