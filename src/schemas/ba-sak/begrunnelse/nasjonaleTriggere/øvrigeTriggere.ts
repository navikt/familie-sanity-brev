import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { erEndretUtbetaling } from './endringsårsakTrigger';
import { vilkårTriggerTilMenynavn, øvrigeTriggertyper } from '../typer';
import { hentNasjonaleTriggereRegler, erNasjonalBegrunnelse } from './utils';

export const øvrigeTriggere = {
  title: 'Øvrige triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: øvrigeTriggertyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) => erEndretUtbetaling(document) || !erNasjonalBegrunnelse(document),
  validation: rule => hentNasjonaleTriggereRegler(rule),
};
