import { BegrunnelseDokumentNavn } from '../../../../../util/typer';
import { Begrunnelse, InstitusjonBegrunnelse, NasjonaleVilkår } from '../typer';
import { erSakspesifikkBegrunnelse } from '../sanityMappeFelt/valgbarhet';
import { FagsakType } from '../sanityMappeFelt/fagsakType';
import { BorMedSøkerTriggere } from '../borMedSøkerTriggere';
import { Rule } from 'sanity';

export const erInstitusjonsBegrunnelse = (
  begrunnelse: Begrunnelse,
): begrunnelse is InstitusjonBegrunnelse =>
  !!erSakspesifikkBegrunnelse(begrunnelse) &&
  (begrunnelse as Record<string, unknown>)[BegrunnelseDokumentNavn.FAGSAK_TYPE] != undefined &&
  (begrunnelse as Record<string, unknown>)[BegrunnelseDokumentNavn.FAGSAK_TYPE] ===
    FagsakType.INSTITUSJON;

export const lagInvaliderUtvidetForInstitusjonRegel = (rule: Rule) =>
  rule.custom((nåVerdi: string[] | undefined, context) => {
    if (erInstitusjonsBegrunnelse(context.document as Begrunnelse) && nåVerdi !== undefined) {
      return nåVerdi.includes(NasjonaleVilkår.UTVIDET_BARNETRYGD)
        ? 'Utvidet barnetrygd er ikke i bruk i institusjonssaker'
        : true;
    }
    return true;
  });

export const lagInstitusjonBorMedSøkerRegel = (rule: Rule) =>
  rule.custom((nåVerdi: string[] | undefined, context) => {
    if (erInstitusjonsBegrunnelse(context.document as Begrunnelse) && nåVerdi !== undefined) {
      return nåVerdi.includes(BorMedSøkerTriggere.DELT_BOSTED) ||
        nåVerdi.includes(BorMedSøkerTriggere.DELT_BOSTED_SKAL_IKKE_DELES)
        ? 'Delt bosted er ikke i bruk i institusjonssaker'
        : true;
    }
    return true;
  });
