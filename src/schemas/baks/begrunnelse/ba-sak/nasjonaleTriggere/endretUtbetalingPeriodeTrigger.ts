import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { Begrunnelse, endretUtbetalingsperioderTriggereValg } from '../typer';
import { erEndretUtbetalingBegrunnelse } from './endringsårsakTrigger';
import { hentNasjonaleTriggereRegler, erNasjonalBegrunnelse } from './utils';
import { Rule } from 'sanity';

export const endretUtbetalingsperiodeTriggere = {
  title: 'Endret utbetalingsperiode triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderTriggereValg,
  },
  hidden: ({ document }: { document: Begrunnelse }) =>
    !erEndretUtbetalingBegrunnelse(document) || !erNasjonalBegrunnelse(document),
  validation: (rule: Rule) => hentNasjonaleTriggereRegler(rule),
};
