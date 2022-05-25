import { BegrunnelseDokumentNavn } from '../../../../util/typer';
import { Behandlingstema } from '../typer';

export const erNasjonalBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.NASJONAL);

export const hentNasjonaleTriggereRegler = rule =>
  rule.custom((currentValue, { document }) => {
    if (erNasjonalBegrunnelse(document) && currentValue !== undefined) {
      return 'En nasjonal begrunnelse-trigger er valgt, men behandlingstema for begrunnelsen er ikke nasjonal.';
    }
    return true;
  });
