import { KSBegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { erNasjonalBegrunnelse } from './eøs/eøsTriggere/utils';

export enum Trigger {
  SATSENDRING = 'SATSENDRING',
  BARN_DØD = 'BARN_DØD',
  DELTID_BARNEHAGEPLASS = 'DELTID_BARNEHAGEPLASS',
  GJELDER_FØRSTE_PERIODE = 'GJELDER_FØRSTE_PERIODE',
}

const triggerValg: Record<Trigger, { title: string; value: Trigger }> = {
  SATSENDRING: { title: 'Satsendring', value: Trigger.SATSENDRING },
  BARN_DØD: {
    title: 'Barn død',
    value: Trigger.BARN_DØD,
  },
  DELTID_BARNEHAGEPLASS: {
    title: 'Barnehageplass - mellom 0 og 33 timer',
    value: Trigger.DELTID_BARNEHAGEPLASS,
  },
  GJELDER_FØRSTE_PERIODE: {
    title: 'Gjelder første periode',
    value: Trigger.GJELDER_FØRSTE_PERIODE,
  },
};

export const triggere = {
  title: 'Triggere',
  type: SanityTyper.ARRAY,
  name: KSBegrunnelseDokumentNavn.TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(Trigger).map(trigger => triggerValg[trigger]),
  },
};
