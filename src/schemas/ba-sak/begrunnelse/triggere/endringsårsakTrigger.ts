import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { endringsårsaker, VilkårTriggere } from '../typer';

const endretUtbetalingEllerEtterEndretUtbetalingErValgt = document =>
  document[BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE] &&
  (document[BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE].includes(VilkårTriggere.ENDRET_UTBETALING) ||
    document[BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE].includes(
      VilkårTriggere.ETTER_ENDRET_UTBETALING,
    ));

export const endringsårsakTrigger = {
  title: 'Endringsårsaker',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRINGSAARSAKER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endringsårsaker,
  },
  hidden: ({ document }) => !endretUtbetalingEllerEtterEndretUtbetalingErValgt(document),
};
