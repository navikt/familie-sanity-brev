import { BegrunnelseDokumentNavn } from '../../../../util/typer';
import { Behandlingstema } from '../typer';

export const erEøsBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.EØS);

export const hentEØSTriggereRegler = rule =>
  rule.custom((currentValue, { document }) => {
    if (!erEøsBegrunnelse(document) && currentValue !== undefined) {
      return 'EØS-trigger er valgt, men behandlingstema for begrunnelsen er ikke EØS.';
    }
    return true;
  });
