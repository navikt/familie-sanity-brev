export const begrunnelsestyper = [
  { title: 'Innvilgelse', value: 'INNVILGELSE' },
  { title: 'Reduksjon', value: 'REDUKSJON' },
  { title: 'Avslag', value: 'AVSLAG' },
  { title: 'Opphør', value: 'OPPHØR' },
  { title: 'Fortsatt innvilget', value: 'FORTSATT_INNVILGET' },
];

export const hjemler = ['2', '4', '10', '11', '12', '17', '18'];

export const vilkår = [
  { title: 'Under 18 år', value: 'UNDER_18_ÅR' },
  { title: 'Bor Med søker', value: 'BOR_MED_SØKER' },
  { title: 'Gift partnerskap', value: 'GIFT_PARTNERSKAP' },
  { title: 'Bosatt i riket', value: 'BOSATT_I_RIKET' },
  { title: 'Lovlig opphold', value: 'LOVLIG_OPPHOLD' },
];

export enum Formuleringstype {
  FOR_BARN_FØDT = 'forBarnFødt',
  DU_OG_ELLER_BARNET_BARNA = 'duOgEllerBarnetBarna',
  BARNET_ELLER_BARNA = 'barnetEllerBarna',
}

export type Formuleringsvalg = { title: string; value: Formuleringstype };

export const formuleringer: Formuleringsvalg[] = [
  { title: 'For barn født', value: Formuleringstype.FOR_BARN_FØDT },
  { title: 'Du eller Du og barna', value: Formuleringstype.DU_OG_ELLER_BARNET_BARNA },
];

export const flettefelter = [
  { title: 'Måned og år for begrunnelse', value: 'maanedOgAarBegrunnelsenGjelderFor' },
];
