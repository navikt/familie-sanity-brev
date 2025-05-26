import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../../util/typer';
import { endringsårsaker } from '../typer';
import { Mappe } from '../mapper';
import { erNasjonalBegrunnelse } from './utils';
import { erEøsBegrunnelse } from '../eøs/eøsTriggere/utils';

export const erEndretUtbetalingBegrunnelse: (document) => boolean = document =>
  document[DokumentNavn.MAPPE] &&
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
  hidden: ({ document }) =>
    !erEndretUtbetalingBegrunnelse(document) ||
    !(erNasjonalBegrunnelse(document) || erEøsBegrunnelse(document)),
  validation: rule => [
    rule
      .custom((endringsårsaktriggere, context) => {
        const _erEndretUtbetaling =
          context.document && erEndretUtbetalingBegrunnelse(context.document);
        const endringsårsakErValgt = endringsårsaktriggere && endringsårsaktriggere.length !== 0;

        return !_erEndretUtbetaling || endringsårsakErValgt
          ? true
          : 'Må velge årsak for endret utbetalingsperiode.';
      })
      .error(),
  ],
};
