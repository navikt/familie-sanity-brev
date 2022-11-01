import { BegrunnelseDokumentNavn } from '../../../../util/typer';
import {
  Behandlingstema,
  Begrunnelse,
  InstitusjonBegrunnelse,
  Vilkår,
  VilkårTriggere,
} from '../typer';

export const erInstitusjonsBegrunnelse = (
  document: Begrunnelse,
): document is InstitusjonBegrunnelse =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] === Behandlingstema.NASJONAL_INSTITUSJON;

export const lagInstitusjonVilkårRegel = rule =>
  rule.custom((nåVerdi, context) => {
    if (erInstitusjonsBegrunnelse(context.document) && nåVerdi !== undefined) {
      return nåVerdi.includes(Vilkår.UTVIDET_BARNETRYGD)
        ? 'Utvidet barnetrygd er ikke i bruk i institusjonssaker'
        : true;
    }
    return true;
  });

export const lagInstitusjonBorMedSøkerRegel = rule =>
  rule.custom((nåVerdi, context) => {
    if (erInstitusjonsBegrunnelse(context.document) && nåVerdi !== undefined) {
      return nåVerdi.includes(VilkårTriggere.DELT_BOSTED) ||
        nåVerdi.includes(VilkårTriggere.DELT_BOSTED_SKAL_IKKE_DELES)
        ? 'Delt bosted er ikke i bruk i institusjonssaker'
        : true;
    }
    return true;
  });
