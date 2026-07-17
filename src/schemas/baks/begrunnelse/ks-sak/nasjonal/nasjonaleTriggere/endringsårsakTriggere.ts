import { KSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../../util/typer';
import { Rule } from 'sanity';
import { erEndretUtbetaling } from './endretUtbetalingPeriodeTriggere';
import { erNasjonalBegrunnelse } from '../../eøs/eøsTriggere/utils';
import { Type } from '../../type';
import { Resultat } from '../../resultat';

export enum Endringsårsak {
  DELT_BOSTED = 'DELT_BOSTED',
  ALLEREDE_UTBETALT = 'ALLEREDE_UTBETALT',
  ETTERBETALING_3MND = 'ETTERBETALING_3MND',
}

const endringsårsakValg: Record<Endringsårsak, { title: string; value: Endringsårsak }> = {
  DELT_BOSTED: { title: 'Delt bosted', value: Endringsårsak.DELT_BOSTED },
  ALLEREDE_UTBETALT: { title: 'Allerede utbetalt', value: Endringsårsak.ALLEREDE_UTBETALT },
  ETTERBETALING_3MND: { title: 'Etterbetaling 3 måned', value: Endringsårsak.ETTERBETALING_3MND },
};

const erEndringsperiodeOgAvslag: (document: Record<string, any>) => boolean = document => {
  return (
    document[KSBegrunnelseDokumentNavn.TYPE] &&
    document[KSBegrunnelseDokumentNavn.TYPE].includes(Type.ENDRINGSPERIODE) &&
    document[KSBegrunnelseDokumentNavn.RESULTAT] &&
    document[KSBegrunnelseDokumentNavn.RESULTAT].includes(Resultat.AVSLAG)
  );
};

const skalEndringsårsakVises = (document: Record<string, any>) => {
  return (
    erNasjonalBegrunnelse(document) &&
    (erEndretUtbetaling(document) || erEndringsperiodeOgAvslag(document))
  );
};

export const endringsårsakTriggere = {
  title: 'Endringsårsaker',
  type: SanityTyper.ARRAY,
  name: KSBegrunnelseDokumentNavn.ENDRINGSAARSAKER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(Endringsårsak).map(endringsårsak => endringsårsakValg[endringsårsak]),
  },
  hidden: ({ document }: { document: Record<string, any> }) => !skalEndringsårsakVises(document),

  validation: (rule: Rule) => [
    rule
      .custom(
        (
          endringsårsakTriggere: string[] | undefined,
          context: { document?: Record<string, any> },
        ) => {
          const _erEndretUtbetaling = context.document && erEndretUtbetaling(context.document);
          const endringsårsakErValgt = endringsårsakTriggere && endringsårsakTriggere.length !== 0;

          return !_erEndretUtbetaling || endringsårsakErValgt
            ? true
            : 'Må velge årsak for endret utbetalingsperiode.';
        },
      )
      .error(),
  ],
};
