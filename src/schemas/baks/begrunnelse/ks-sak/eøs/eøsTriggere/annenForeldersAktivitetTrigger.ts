import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../../util/typer';
import { erEøsBegrunnelse, hentEØSTriggereRegler, kanKompetanseTriggereVelges } from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

enum AnnenForelderAktivitet {
  I_ARBEID = 'I_ARBEID',
  MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN = 'MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN',
  FORSIKRET_I_BOSTEDSLAND = 'FORSIKRET_I_BOSTEDSLAND',
  MOTTAR_PENSJON = 'MOTTAR_PENSJON',
  INAKTIV = 'INAKTIV',
  IKKE_AKTUELT = 'IKKE_AKTUELT',
  UTSENDT_ARBEIDSTAKER = 'UTSENDT_ARBEIDSTAKER',
  NASJONAL_RETT_DIFFERANSEBEREGNING = 'NASJONAL_RETT_DIFFERANSEBEREGNING',

  // Annen forelders aktivitet valg som kun gjelder dersom annen forelder er omfattet av norsk lovgivning
  ARBEIDER = 'ARBEIDER',
  SELVSTENDIG_NÆRINGSDRIVENDE = 'SELVSTENDIG_NÆRINGSDRIVENDE',
  UTSENDT_ARBEIDSTAKER_FRA_NORGE = 'UTSENDT_ARBEIDSTAKER_FRA_NORGE',
  MOTTAR_UFØRETRYGD = 'MOTTAR_UFØRETRYGD',
  ARBEIDER_PÅ_NORSKREGISTRERT_SKIP = 'ARBEIDER_PÅ_NORSKREGISTRERT_SKIP',
  ARBEIDER_PÅ_NORSK_SOKKEL = 'ARBEIDER_PÅ_NORSK_SOKKEL',
  ARBEIDER_FOR_ET_NORSK_FLYSELSKAP = 'ARBEIDER_FOR_ET_NORSK_FLYSELSKAP',
  ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON = 'ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON',
  MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = 'MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET',
  MOTTAR_UFØRETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = 'MOTTAR_UFØRETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET',
  MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = 'MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET',
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
  UTSENDT_ARBEIDSTAKER: {
    title: 'Utsendt arbeidstaker',
    value: AnnenForelderAktivitet.UTSENDT_ARBEIDSTAKER,
  },
  NASJONAL_RETT_DIFFERANSEBEREGNING: {
    title: 'Nasjonal rett-differanseberegning',
    value: AnnenForelderAktivitet.NASJONAL_RETT_DIFFERANSEBEREGNING,
  },
  // Annen forelders aktivitet valg som kun gjelder dersom annen forelder er omfattet av norsk lovgivning
  ARBEIDER: {
    title: 'Arbeider',
    value: AnnenForelderAktivitet.ARBEIDER,
  },
  SELVSTENDIG_NÆRINGSDRIVENDE: {
    title: 'Selvstendig næringsdrivende',
    value: AnnenForelderAktivitet.SELVSTENDIG_NÆRINGSDRIVENDE,
  },
  UTSENDT_ARBEIDSTAKER_FRA_NORGE: {
    title: 'Utsendt arbeidstaker fra Norge',
    value: AnnenForelderAktivitet.UTSENDT_ARBEIDSTAKER_FRA_NORGE,
  },
  MOTTAR_UFØRETRYGD: {
    title: 'Mottar uføretrygd',
    value: AnnenForelderAktivitet.MOTTAR_UFØRETRYGD,
  },
  ARBEIDER_PÅ_NORSKREGISTRERT_SKIP: {
    title: 'Arbeider på norskregistrert skip',
    value: AnnenForelderAktivitet.ARBEIDER_PÅ_NORSKREGISTRERT_SKIP,
  },
  ARBEIDER_PÅ_NORSK_SOKKEL: {
    title: 'Arbeider på norsk sokkel',
    value: AnnenForelderAktivitet.ARBEIDER_PÅ_NORSK_SOKKEL,
  },
  ARBEIDER_FOR_ET_NORSK_FLYSELSKAP: {
    title: 'Arbeider for et norsk flyselskap',
    value: AnnenForelderAktivitet.ARBEIDER_FOR_ET_NORSK_FLYSELSKAP,
  },
  ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON: {
    title: 'Arbeider ved utenlandsk utenriksstasjon',
    value: AnnenForelderAktivitet.ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON,
  },
  MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET: {
    title: 'Mottar utbetaling fra NAV under opphold i utlandet',
    value: AnnenForelderAktivitet.MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET,
  },
  MOTTAR_UFØRETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET: {
    title: 'Mottar uføretrygd fra Norge under opphold i utlandet',
    value: AnnenForelderAktivitet.MOTTAR_UFØRETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET,
  },
  MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET: {
    title: 'Mottar pensjon fra Norge under opphold i utlandet',
    value: AnnenForelderAktivitet.MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET,
  },
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
  hidden: ({ document }) => !erEøsBegrunnelse(document) || !kanKompetanseTriggereVelges(document),
  validation: rule => hentEØSTriggereRegler(rule, true, [EØSTriggerType.KOMPETANSE]),
};
