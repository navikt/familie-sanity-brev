import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { endringstyper, VilkårTriggere } from '../typer';

const endretUtbetalingEllerEtterEndretUtbetalingErValgt = document =>
  document[BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE] &&
  (document[BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE].includes(VilkårTriggere.ENDRET_UTBETALING) ||
    document[BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE].includes(
      VilkårTriggere.ETTER_ENDRET_UTBETALING,
    ));

export const endringstypeTrigger = {
  title: 'Endringstype',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRINGSTYPER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endringstyper,
  },
  hidden: ({ document }) => !endretUtbetalingEllerEtterEndretUtbetalingErValgt(document),
};
