import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';
import { NasjonaleVilkår } from '../typer';
import { erInstitusjonsBegrunnelse } from '../institusjon/utils';
import { erEndretUtbetalingBegrunnelse } from '../nasjonaleTriggere/endringsårsakTrigger';
import { Rule } from 'sanity';

export enum Rolle {
  SOKER = 'SOKER',
  BARN = 'BARN',
}

const gjelderBosattIRiketVilkår = (dokument?: any) =>
  dokument?.vilkaar && dokument.vilkaar.includes(NasjonaleVilkår.BOSATT_I_RIKET);

const gjelderLovligOppholdVilkår = (dokument?: any) =>
  dokument?.vilkaar && dokument.vilkaar.includes(NasjonaleVilkår.LOVLIG_OPPHOLD);

const rolleSkalVises = (dokument?: any): boolean =>
  !erInstitusjonsBegrunnelse(dokument) &&
  (gjelderBosattIRiketVilkår(dokument) ||
    gjelderLovligOppholdVilkår(dokument) ||
    erEndretUtbetalingBegrunnelse(dokument));

export const rolleTilMenyValg = (rolle: Rolle): Menyvalg<Rolle> => {
  const rolleTilMenynavn = (rolle: Rolle): string => {
    switch (rolle) {
      case Rolle.SOKER:
        return 'Søker';
      case Rolle.BARN:
        return 'Barn';
    }
  };

  return { title: rolleTilMenynavn(rolle), value: rolle };
};

export const rolle = {
  title: 'Rolle',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ROLLE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(Rolle).map(rolle => rolleTilMenyValg(rolle)),
  },
  hidden: context => !rolleSkalVises(context.document),
  validation: (rule: Rule) =>
    rule.custom((rolleListe: Rolle[] | undefined, context) => {
      if (rolleSkalVises(context.document)) {
        return !rolleListe || rolleListe.length === 0 ? 'Må velge minst en rolle' : true;
      }
      return true;
    }),
};
