import { NasjonalBegrunnelse, Begrunnelse } from '../typer';
import { BegrunnelseDokumentNavn } from '../../../../../util/typer';
import { Regelverk } from '../sanityMappeFelt/regelverk';

export const erNasjonalBegrunnelse = (document: Begrunnelse): document is NasjonalBegrunnelse =>
  document[BegrunnelseDokumentNavn.REGELVERK] &&
  (document[BegrunnelseDokumentNavn.REGELVERK] === Regelverk.NASJONAL ||
    document[BegrunnelseDokumentNavn.REGELVERK] === Regelverk.FELLES);

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
    'En nasjonal begrunnelse-trigger er valgt, men regelverk for begrunnelsen er ikke nasjonal.',
  );
