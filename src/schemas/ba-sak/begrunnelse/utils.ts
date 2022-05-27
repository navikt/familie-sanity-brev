import { Behandlingstema, Vilkår } from './typer';
import { BegrunnelseDokumentNavn } from '../../../util/typer';

export const rolleSkalVises = (dokument?: any): boolean =>
  dokument?.vilkaar &&
  (dokument.vilkaar.includes(Vilkår.BOSATT_I_RIKET) ||
    dokument.vilkaar.includes(Vilkår.LOVLIG_OPPHOLD));

export const erNasjonalBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.NASJONAL);

export const hentNasjonaltFeltRegler = (rule, feilmelding: string) =>
  rule.custom((currentValue, { document }) => {
    if (erNasjonalBegrunnelse(document) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

export const hentNasjonalHjemmelRegler = rule =>
  hentNasjonaltFeltRegler(
    rule,
    'En nasjonal begrunnelse-hjemel er valgt, men behandlingstema for begrunnelsen er ikke nasjonal.',
  );
