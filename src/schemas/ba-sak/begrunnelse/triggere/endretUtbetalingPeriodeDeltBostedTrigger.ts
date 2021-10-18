import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { endretUtbetalingsperioderDeltBostedTriggereValg, Endringsårsak } from '../typer';

const erEndretUtbetalingAvTypeDeltBosted = document =>
  document[BegrunnelseDokumentNavn.ENDRINGSAARSAKER] &&
  document[BegrunnelseDokumentNavn.ENDRINGSAARSAKER].includes(Endringsårsak.DELT_BOSTED);

export const endretUtbetalingsperiodeDeltBostedTriggere = {
  title: 'Endret utbetalingsperiode triggere for delt bosted.',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_DELT_BOSTED_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: endretUtbetalingsperioderDeltBostedTriggereValg,
  },
  hidden: ({ document }) => !erEndretUtbetalingAvTypeDeltBosted(document),
};
