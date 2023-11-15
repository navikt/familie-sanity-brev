import {
  Begrunnelse,
  eøsFlettefelter,
  flettefelter,
  InstitusjonBegrunnelse,
  NasjonalBegrunnelse,
} from './typer';
import { erEøsBegrunnelse } from './eøs/eøsTriggere/utils';
import { erNasjonalBegrunnelse } from './nasjonaleTriggere/utils';
import { erInstitusjonsBegrunnelse } from './institusjon/utils';

export const validerFlettefeltErGyldigForRegelverk = (flettefelt, context) => {
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
    return `Flettefeltet ${flettefelt} er ikke tillatt når regelverk er "Nasjonal"`;
  } else return true;
};

export const erNasjonalEllerInstitusjonsBegrunnelse = (
  document: Begrunnelse,
): document is NasjonalBegrunnelse | InstitusjonBegrunnelse =>
  erNasjonalBegrunnelse(document) || erInstitusjonsBegrunnelse(document);

export const lagUtfyltNasjonaltFeltMenFeilRegelverkRegel = rule =>
  rule.custom((nåVerdi, context) => {
    if (nåVerdi !== undefined && !erNasjonalEllerInstitusjonsBegrunnelse(context.document)) {
      return 'Feltet er kun gyldig for regelverk Nasjonal eller Nasjonal institusjon.';
    }
    return true;
  });

export const lagUtfyltØvrigeTriggereFeltMenFeilRegelverkRegel = rule =>
  rule.custom((nåVerdi, context) => {
    if (nåVerdi !== undefined && !erInstitusjonsBegrunnelse(context.document)) {
      return 'Feltet er ikke gyldig for regelverk Institusjon.';
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
