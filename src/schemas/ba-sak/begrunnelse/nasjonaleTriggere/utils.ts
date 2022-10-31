import { Behandlingstema } from '../typer';
import { BegrunnelseDokumentNavn } from '../../../../util/typer';

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

export const hentNasjonaleTriggereRegler = rule =>
  hentNasjonaltFeltRegler(
    rule,
    'En nasjonal begrunnelse-trigger er valgt, men behandlingstema for begrunnelsen er ikke nasjonal.',
  );

export const lagNasjonalFeltObligatoriskRegel = rule =>
  rule.custom((currentValue, { document }) => {
    if (erNasjonalBegrunnelse(document) && currentValue === undefined) {
      return 'Feltet mangler verdi';
    }
    return true;
  });
