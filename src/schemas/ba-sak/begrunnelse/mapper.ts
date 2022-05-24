export enum Mappe {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
  ENDRET_UTBETALINGSPERIODE = 'ENDRET_UTBETALINGSPERIODE',
  ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
  EØS = 'EØS',
}

export const mapperTilMenynavn: Record<Mappe, { title: string; value: Mappe }> = {
  INNVILGET: { title: 'Innvilget', value: Mappe.INNVILGET },
  REDUKSJON: { title: 'Reduksjon', value: Mappe.REDUKSJON },
  AVSLAG: { title: 'Avslag', value: Mappe.AVSLAG },
  OPPHØR: { title: 'Opphør', value: Mappe.OPPHØR },
  FORTSATT_INNVILGET: { title: 'Fortsatt innvilget', value: Mappe.FORTSATT_INNVILGET },
  ENDRET_UTBETALINGSPERIODE: {
    title: 'Endret utbetaling',
    value: Mappe.ENDRET_UTBETALINGSPERIODE,
  },
  ETTER_ENDRET_UTBETALINGSPERIODE: {
    title: 'Etter endret utbetaling',
    value: Mappe.ETTER_ENDRET_UTBETALINGSPERIODE,
  },
  EØS: {
    title: 'EØS',
    value: Mappe.EØS,
  },
};
