import { Behandlingstema, eøsFlettefelter, flettefelter, Vilkår } from './typer';
import { BegrunnelseDokumentNavn } from '../../../util/typer';
import { erEøsBegrunnelse } from './eøs/eøsTriggere/utils';

export const rolleSkalVises = (dokument?: any): boolean =>
  dokument?.vilkaar &&
  (dokument.vilkaar.includes(Vilkår.BOSATT_I_RIKET) ||
    dokument.vilkaar.includes(Vilkår.LOVLIG_OPPHOLD));

export const erNasjonalBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.NASJONAL);

export const hentNasjonaltFeltRegler = (rule, feilmelding: string) =>
  rule.custom((currentValue, { document }) => {
    if (!erNasjonalBegrunnelse(document) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

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
