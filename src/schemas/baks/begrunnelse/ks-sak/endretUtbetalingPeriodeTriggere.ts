import { KSBegrunnelseDokumentNavn, SanityTyper } from "../../../../util/typer";
import { erEndretUtbetaling } from "./resultat";

export enum EndretUtbetalingsperioder {
    ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
}

const endretUtbetalingsperioderValg: Record<EndretUtbetalingsperioder,
    { title: string; value: EndretUtbetalingsperioder }> = {
    ETTER_ENDRET_UTBETALINGSPERIODE: {
        title: 'Etter endret utbetaling',
        value: EndretUtbetalingsperioder.ETTER_ENDRET_UTBETALINGSPERIODE,
    },
};

export const endretUtbetalingsperiodeTriggere = {
    title: 'Endret utbetalingsperioder',
    type: SanityTyper.ARRAY,
    name: KSBegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE,
    of: [{type: SanityTyper.STRING}],
    options: {
        list: Object.values(EndretUtbetalingsperioder).map(endretUtbetalingsperiode => endretUtbetalingsperioderValg[endretUtbetalingsperiode]),
    },
    hidden: ({document}) => !erEndretUtbetaling(document),
};
