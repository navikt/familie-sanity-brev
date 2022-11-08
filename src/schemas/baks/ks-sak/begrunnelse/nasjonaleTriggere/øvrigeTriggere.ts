import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { erEndretUtbetaling } from './endringsårsakTrigger';
import { vilkårTriggerTilMenynavn, øvrigeTriggertyper } from '../typer';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel,
} from '../../../ba-sak/begrunnelse/utils';

export const øvrigeTriggere = {
  title: 'Øvrige triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: øvrigeTriggertyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    erEndretUtbetaling(document) || !erNasjonalEllerInstitusjonsBegrunnelse(document),
  validation: rule => lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel(rule),
};
