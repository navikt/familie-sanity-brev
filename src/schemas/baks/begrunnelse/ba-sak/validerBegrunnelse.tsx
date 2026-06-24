import { ObjectSchemaType, Rule, ValidationContext } from 'sanity';

function tilTekst(feltverdi: unknown): string {
  return Array.isArray(feltverdi) ? feltverdi.join(', ') : String(feltverdi);
}

export const validerBegrunnelse = () => (rule: Rule) =>
  rule.custom((_verdi: unknown, kontekst: ValidationContext): true | string => {
    const feil: string[] = [];
    const type = kontekst.type as ObjectSchemaType;

    type.fields.forEach(field => {
      const hidden = field.type?.hidden;
      const erHidden = typeof hidden === 'function' ? hidden(kontekst as any) : hidden;
      const feltverdi = kontekst.document?.[field.name];
      if (erHidden && feltverdi !== undefined) {
        feil.push(
          `${field.type.title} er skjult, men er satt til ${tilTekst(
            feltverdi,
          )}. Fjern dette før du publiserer eller ta kontakt med en utvikler.`,
        );
      }
    });

    if (feil.length !== 0) {
      return feil.join('\n');
    } else {
      return true;
    }
  });
