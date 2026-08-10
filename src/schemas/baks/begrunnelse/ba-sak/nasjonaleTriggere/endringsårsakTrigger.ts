import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../../util/typer';
import { Begrunnelse, endringsårsaker } from '../typer';
import { Mappe } from '../mapper';
import { erNasjonalBegrunnelse } from './utils';
import { erEøsBegrunnelse } from '../eøs/eøsTriggere/utils';
import { Rule } from 'sanity';

export const erEndretUtbetalingBegrunnelse: (document: Begrunnelse) => boolean = document =>
  document[DokumentNavn.MAPPE] != undefined &&
  (document[DokumentNavn.MAPPE].includes(Mappe.ENDRET_UTBETALINGSPERIODE) ||
    document[DokumentNavn.MAPPE].includes(Mappe.ETTER_ENDRET_UTBETALINGSPERIODE));

export const endringsårsakTrigger = {
  title: 'Endringsårsaker',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRINGSAARSAKER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endringsårsaker,
  },
  hidden: ({ document }: { document: Begrunnelse }) =>
    !erEndretUtbetalingBegrunnelse(document) ||
    !(erNasjonalBegrunnelse(document) || erEøsBegrunnelse(document)),
  validation: (rule: Rule) => [
    rule
      .custom((endringsårsaktriggere: string[] | undefined, context) => {
        const _erEndretUtbetaling =
          context.document && erEndretUtbetalingBegrunnelse(context.document as Begrunnelse);
        const endringsårsakErValgt = endringsårsaktriggere && endringsårsaktriggere.length !== 0;

        return !_erEndretUtbetaling || endringsårsakErValgt
          ? true
          : 'Må velge årsak for endret utbetalingsperiode.';
      })
      .error(),
  ],
};
