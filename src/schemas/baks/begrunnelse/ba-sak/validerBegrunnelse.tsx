function tilTekst(feltverdi) {
  return Array.isArray(feltverdi) ? feltverdi.join(', ') : feltverdi;
}

export const validerBegrunnelse = () => rule =>
  rule.custom((verdi: string, kontekst): true | string => {
    const feil = [];

    kontekst.type.fields.forEach(field => {
      const erHidden = field?.type?.hidden ? field.type.hidden(kontekst) : false;
      const feltverdi = kontekst.document[field.name];
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
