import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { endretUtbetalingsperioderTriggereValg } from '../typer';
import { erEndretUtbetaling } from './endringsårsakTrigger';
import { erEøsBegrunnelse } from '../EØSTriggere/utlis';
import { hentNasjonaleTriggereRegler } from './utils';

export const endretUtbetalingsperiodeTriggere = {
  title: 'Endret utbetalingsperiode triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderTriggereValg,
  },
  hidden: ({ document }) => !erEndretUtbetaling(document) || erEøsBegrunnelse(document),
  validation: rule => hentNasjonaleTriggereRegler(rule),
};
