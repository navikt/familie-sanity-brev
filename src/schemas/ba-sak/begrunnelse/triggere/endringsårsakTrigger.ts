import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../util/typer';
import { Begrunnelsestype, endringsårsaker } from '../typer';

export const erEndretUtbetaling: (document) => boolean = document =>
  document[DokumentNavn.MAPPE] &&
  (document[DokumentNavn.MAPPE].includes(Begrunnelsestype.ENDRET_UTBETALINGSPERIODE) ||
    document[DokumentNavn.MAPPE].includes(Begrunnelsestype.ETTER_ENDRET_UTBETALINGSPERIODE));

export const endringsårsakTrigger = {
  title: 'Endringsårsaker',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRINGSAARSAKER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endringsårsaker,
  },
  hidden: ({ document }) => !erEndretUtbetaling(document),
  validation: Rule =>
    Rule.custom((endringsårsaktriggere, context) => {
      const _erEndretUtbetaling = context.document && erEndretUtbetaling(context.document);
      const endringsårsakErValgt = endringsårsaktriggere && endringsårsaktriggere.length !== 0;

      return !_erEndretUtbetaling || endringsårsakErValgt
        ? true
        : 'Må velge årsak for endret utbetalingsperiode.';
    }).error(),
};
