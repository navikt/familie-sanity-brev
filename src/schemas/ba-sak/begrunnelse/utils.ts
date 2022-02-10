import { Vilkår } from './typer';

export const rolleSkalVises = (dokument?: any): boolean =>
  dokument?.vilkaar &&
  (dokument.vilkaar.includes(Vilkår.BOSATT_I_RIKET) ||
    dokument.vilkaar.includes(Vilkår.LOVLIG_OPPHOLD));
