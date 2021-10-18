import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../util/typer';
import { Begrunnelsestype, endringsårsaker } from '../typer';

export const erEndretUtbetaling = document =>
  document[DokumentNavn.MAPPE] &&
  document[DokumentNavn.MAPPE].includes(Begrunnelsestype.ENDRET_UTBETALINGSPERIODE);

export const endringsårsakTrigger = {
  title: 'Endringsårsaker',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRINGSAARSAKER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endringsårsaker,
  },
  hidden: ({ document }) => !erEndretUtbetaling(document),
};
