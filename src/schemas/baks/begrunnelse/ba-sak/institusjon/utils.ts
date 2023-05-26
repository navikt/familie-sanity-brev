import { BegrunnelseDokumentNavn } from '../../../../../util/typer';
import { Begrunnelse, InstitusjonBegrunnelse, Vilkår, VilkårTriggere } from '../typer';
import { Valgbarhet } from '../sanityMappeFelt/valgbarhet';
import { FagsakType } from '../sanityMappeFelt/fagsakType';

export const erInstitusjonsBegrunnelse = (
  document: Begrunnelse,
): document is InstitusjonBegrunnelse =>
  document[BegrunnelseDokumentNavn.VALGBARHET] &&
  document[BegrunnelseDokumentNavn.VALGBARHET] === Valgbarhet.SAKSPESIFIKK &&
  document[BegrunnelseDokumentNavn.FAGSAK_TYPE] &&
  document[BegrunnelseDokumentNavn.FAGSAK_TYPE] === FagsakType.INSTITUSJON;

export const lagInvaliderUtvidetForInstitusjonRegel = rule =>
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
