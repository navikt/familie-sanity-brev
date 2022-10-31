import { Behandlingstema, eøsFlettefelter, flettefelter, Vilkår } from './typer';
import { erEøsBegrunnelse } from './eøs/eøsTriggere/utils';
import { erNasjonalBegrunnelse } from './nasjonaleTriggere/utils';

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

export const erNasjonalEllerInstitusjonsBegrunnelse = (document): boolean =>
  erNasjonalBegrunnelse(document) || erInstitusjonsBegrunnelse(document);
