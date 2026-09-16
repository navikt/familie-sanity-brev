import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../util/typer';
import { Mappe } from './mapper';
import { Begrunnelse, VilkårTriggere, vilkårTriggerTilMenynavn, øvrigeTriggertyper } from './typer';
import { Rule } from 'sanity';

const erIMappe = (document: Begrunnelse | undefined, mappe: Mappe) =>
  document?.[DokumentNavn.MAPPE]?.includes(mappe) ?? false;

export const øvrigeTriggere = {
  title: 'Øvrige triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: øvrigeTriggertyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }: { document: Begrunnelse }) =>
    erIMappe(document, Mappe.ETTER_ENDRET_UTBETALINGSPERIODE),
  validation: (rule: Rule) =>
    rule.custom((triggere: VilkårTriggere[] | undefined, context) =>
      erIMappe(context.document as Begrunnelse, Mappe.ENDRET_UTBETALINGSPERIODE) &&
      triggere?.some(trigger => trigger !== VilkårTriggere.ALLTID_AUTOMATISK)
        ? 'Begrunnelser for endret utbetaling kan bare ha triggeren "Skal kun settes automatisk og ikke manuelt".'
        : true,
    ),
};
