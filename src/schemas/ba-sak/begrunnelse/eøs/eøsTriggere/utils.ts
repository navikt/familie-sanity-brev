import { BegrunnelseDokumentNavn } from '../../../../../util/typer';
import { Behandlingstema } from '../../typer';
import { erNasjonalBegrunnelse } from '../../utils';

export const erEøsBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.EØS);

export const hentEØSTriggereRegler = rule => [
  hentEØSFeltRegler(
    rule,
    'en EØS-trigger er valgt, men behandlingstema for begrunnelsen er ikke EØS.',
  ),
  lagEØSFeltObligatoriskRegel,
];

export const hentEØSHjemmelRegler = rule =>
  hentEØSFeltRegler(
    rule,
    'En EØS-hjemmel er valgt, men behandlingstema for begrunnelsen er ikke eøs.',
  );

export const hentEØSFeltRegler = (rule, feilmelding: string) =>
  rule.custom((currentValue, { document }) => {
    if (erNasjonalBegrunnelse(document) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

const lagEØSFeltObligatoriskRegel = rule => 
  rule.custom((currentValue, {document}) => {
    if (erEøsBegrunnelse(document) && currentValue === undefined) {
      return 'Du må velge minst ett valg for triggerne'
    }
    return true;
  });