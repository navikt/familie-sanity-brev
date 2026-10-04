import { Rule } from 'sanity';
import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { Begrunnelse, endretUtbetalingsperioderTriggereValg } from '../typer';
import { erEndretUtbetalingBegrunnelse } from './endringsårsakTrigger';
import { erNasjonalBegrunnelse, hentNasjonaleTriggereRegler } from './utils';

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
