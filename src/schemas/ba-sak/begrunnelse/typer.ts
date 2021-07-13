export const begrunnelsestyper = [
  { title: 'Innvilgelse', value: 'innvilgelse' },
  { title: 'Reduksjon', value: 'reduksjon' },
  { title: 'Avslag', value: 'avslag' },
  { title: 'Opphør', value: 'opphør' },
  { title: 'Fortsatt innvilget', value: 'fortsattInnvilget' },
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
  DU_ELLER_DU_OG_BARNA = 'duEllerDuOgBarna',
  BARNET_ELLER_BARNA = 'barnetEllerBarna',
}

export type Formuleringsvalg = { title: string; value: Formuleringstype };

export const formuleringer: Formuleringsvalg[] = [
  { title: 'For barn født', value: Formuleringstype.FOR_BARN_FØDT }, // Du og - dersom man har barnas fødselsdager
  { title: 'Du eller Du og barna', value: Formuleringstype.DU_ELLER_DU_OG_BARNA }, // Du og - dersom man har barnas fødselsdager
  //{ title: 'barn født', value: 'barnFødt' }, // Barn født dersom man har fødseldato til barn
  //{ title: 'for barn født', value: 'forBarnFødt' }, // (for barn født <dato>)
  //{ title: 'fra-formulering', value: 'fraFormulering' }, // "Fra <dato>" | ""
  //{ title: 'til-formulering', value: 'tilFormulering' }, // "ti<l <dato>" | ""
];

export const flettefelter = [
  //{ title: 'Måned og år begrunnelsen gjelder for', value: 'månedOgÅrBegrunnelsenGjelderFor' },
  { title: 'Dato', value: 'dato' },
];
