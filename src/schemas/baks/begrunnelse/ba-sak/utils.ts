import {
  Behandlingstema,
  Begrunnelse,
  eøsFlettefelter,
  flettefelter,
  InstitusjonBegrunnelse,
  NasjonalBegrunnelse,
  Vilkår,
} from './typer';
import { erEøsBegrunnelse } from './eøs/eøsTriggere/utils';
import { erNasjonalBegrunnelse } from './nasjonaleTriggere/utils';
import { erInstitusjonsBegrunnelse } from './institusjon/utils';

export const rolleSkalVises = (dokument?: any): boolean =>
  dokument?.behandlingstema &&
  dokument.behandlingstema !== Behandlingstema.NASJONAL_INSTITUSJON &&
  dokument?.vilkaar &&
  (dokument.vilkaar.includes(Vilkår.BOSATT_I_RIKET) ||
    dokument.vilkaar.includes(Vilkår.LOVLIG_OPPHOLD));

export const validerFlettefeltErGyldigForBehandlingstema = (flettefelt, context) => {
  if (
    erEøsBegrunnelse(context.document) &&
    !eøsFlettefelter.map(flettefelt => flettefelt.value).includes(flettefelt)
  ) {
    return `Flettefeltet ${flettefelt} er ikke tillatt for EØS-begrunnelser`;
  }
  if (
    erNasjonalBegrunnelse(context.document) &&
    !flettefelter.map(flettefelt => flettefelt.value).includes(flettefelt)
  ) {
    return `Flettefeltet ${flettefelt} er ikke tillatt når behandlingstema er "Nasjonal"`;
  } else return true;
};

export const erNasjonalEllerInstitusjonsBegrunnelse = (
  document: Begrunnelse,
): document is NasjonalBegrunnelse | InstitusjonBegrunnelse =>
  erNasjonalBegrunnelse(document) || erInstitusjonsBegrunnelse(document);

export const lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel = rule =>
  rule.custom((nåVerdi, context) => {
    if (nåVerdi !== undefined && !erNasjonalEllerInstitusjonsBegrunnelse(context.document)) {
      return 'Feltet er kun gyldig for behandlingstema Nasjonal eller Nasjonal institusjon.';
    }
    return true;
  });

export const lagVilkårManglerForNasjonalEllerInstitusjonBegrunnelse = rule =>
  rule.custom((nåVerdi, context) => {
    if (erNasjonalEllerInstitusjonsBegrunnelse(context.document) && nåVerdi === undefined) {
      return 'Ingen vilkår er valgt';
    }
    return true;
  });
