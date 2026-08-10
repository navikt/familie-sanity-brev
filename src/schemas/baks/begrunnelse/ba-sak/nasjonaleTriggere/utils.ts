import { NasjonalBegrunnelse, Begrunnelse } from '../typer';
import { BegrunnelseDokumentNavn } from '../../../../../util/typer';
import { Regelverk } from '../sanityMappeFelt/regelverk';
import { Rule } from 'sanity';

export const erNasjonalBegrunnelse = (document: Begrunnelse): document is NasjonalBegrunnelse =>
  document[BegrunnelseDokumentNavn.REGELVERK] != undefined &&
  (document[BegrunnelseDokumentNavn.REGELVERK] === Regelverk.NASJONAL ||
    document[BegrunnelseDokumentNavn.REGELVERK] === Regelverk.FELLES);

export const hentNasjonaltFeltRegler = (rule: Rule, feilmelding: string) =>
  rule.custom((currentValue, { document }) => {
    const begrunnelse = document as Begrunnelse | undefined;
    if (begrunnelse && !erNasjonalBegrunnelse(begrunnelse) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

export const hentNasjonaleTriggereRegler = (rule: Rule) =>
  hentNasjonaltFeltRegler(
    rule,
    'En nasjonal begrunnelse-trigger er valgt, men regelverk for begrunnelsen er ikke nasjonal.',
  );
