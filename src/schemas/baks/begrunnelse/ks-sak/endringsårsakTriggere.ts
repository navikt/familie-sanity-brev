import {KSBegrunnelseDokumentNavn, SanityTyper} from "../../../../util/typer";
import {erEndretUtbetaling} from "./resultat";

export enum Endringsårsak {
    DELT_BOSTED = 'DELT_BOSTED',
    ALLEREDE_UTBETALT = 'ALLEREDE_UTBETALT',
    ETTERBETALING_3MND = 'ETTERBETALING_3MND',
}

const endringsårsakValg: Record<Endringsårsak, { title: string; value: Endringsårsak }> = {
    DELT_BOSTED: {title: 'Delt bosted', value: Endringsårsak.DELT_BOSTED},
    ALLEREDE_UTBETALT: {title: 'Allerede utbetalt', value: Endringsårsak.ALLEREDE_UTBETALT},
    ETTERBETALING_3MND: {title: 'Etterbetaling 3 måned', value: Endringsårsak.ETTERBETALING_3MND},
};

export const endringsårsakTriggere = {
    title: 'Endringsårsaker',
    type: SanityTyper.ARRAY,
    name: KSBegrunnelseDokumentNavn.ENDRINGSAARSAKER,
    of: [{type: SanityTyper.STRING}],
    options: {
        list: Object.values(Endringsårsak).map(endringsårsak => endringsårsakValg[endringsårsak]),
    },
    hidden: ({document}) => !erEndretUtbetaling(document),
    validation: rule => [
        rule
            .custom((endringsårsakTriggere, context) => {
                const _erEndretUtbetaling = context.document && erEndretUtbetaling(context.document);
                const endringsårsakErValgt = endringsårsakTriggere && endringsårsakTriggere.length !== 0;

                return !_erEndretUtbetaling || endringsårsakErValgt
                    ? true
                    : 'Må velge årsak for endret utbetalingsperiode.';
            })
            .error(),
    ],
};
