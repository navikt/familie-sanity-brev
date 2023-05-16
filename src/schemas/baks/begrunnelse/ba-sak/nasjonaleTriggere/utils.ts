import { NasjonalBegrunnelse, Begrunnelse } from '../typer';
import { BegrunnelseDokumentNavn } from '../../../../../util/typer';
import { BegrunnelseTema } from '../sanityMappeFelt/begrunnelsetema';

export const erNasjonalBegrunnelse = (document: Begrunnelse): document is NasjonalBegrunnelse =>
  document[BegrunnelseDokumentNavn.TEMA] &&
  document[BegrunnelseDokumentNavn.TEMA] === BegrunnelseTema.NASJONAL;

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
