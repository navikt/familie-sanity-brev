import { hentNasjonaltFeltRegler, erNasjonalBegrunnelse } from '../utils';

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
