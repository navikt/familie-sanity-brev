import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { skalViseEøsTrigger, hentEØSTriggereRegler, kanKompetanseTriggereVelges } from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

enum AnnenForelderAktivitet {
  I_ARBEID = 'I_ARBEID',
  MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN = 'MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN',
  FORSIKRET_I_BOSTEDSLAND = 'FORSIKRET_I_BOSTEDSLAND',
  MOTTAR_PENSJON = 'MOTTAR_PENSJON',
  INAKTIV = 'INAKTIV',
  IKKE_AKTUELT = 'IKKE_AKTUELT',
}

const annenForeldersAktivitetValg: Record<
  AnnenForelderAktivitet,
  { title: string; value: AnnenForelderAktivitet }
> = {
  I_ARBEID: { title: 'I arbeid', value: AnnenForelderAktivitet.I_ARBEID },
  MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN: {
    title: 'Mottar utbetaling som erstatter lønn',
    value: AnnenForelderAktivitet.MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN,
  },
  FORSIKRET_I_BOSTEDSLAND: {
    title: 'Forsikret i bostedsland',
    value: AnnenForelderAktivitet.FORSIKRET_I_BOSTEDSLAND,
  },
  MOTTAR_PENSJON: { title: 'Mottar pensjon', value: AnnenForelderAktivitet.MOTTAR_PENSJON },
  INAKTIV: { title: 'Inaktiv', value: AnnenForelderAktivitet.INAKTIV },
  IKKE_AKTUELT: { title: 'Ikke aktuelt', value: AnnenForelderAktivitet.IKKE_AKTUELT },
};

export const annenForeldersAktivitetTrigger = {
  title: 'Annen forelders aktivitet',
  type: SanityTyper.ARRAY,
  name: EØSBegrunnelseDokumentNavn.ANNEN_FORELDERS_AKTIVITET,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(AnnenForelderAktivitet).map(
      annenForelderAktivitet => annenForeldersAktivitetValg[annenForelderAktivitet],
    ),
  },
  hidden: ({ document }) => !skalViseEøsTrigger(document) || !kanKompetanseTriggereVelges(document),
  validation: rule => hentEØSTriggereRegler(rule, true, [EØSTriggerType.KOMPETANSE]),
};
