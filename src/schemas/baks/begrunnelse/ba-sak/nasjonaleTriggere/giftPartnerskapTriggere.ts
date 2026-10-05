import type { Rule } from 'sanity';
import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { type Begrunnelse, giftPartnerskapTriggerTyper, NasjonaleVilkår, vilkårTriggerTilMenynavn } from '../typer';
import { erNasjonalEllerInstitusjonsBegrunnelse, lagUtfyltNasjonaltFeltMenFeilRegelverkRegel } from '../utils';

export const giftPartnerskapTriggere = {
    title: 'Triggere for "Gift partnerskap"',
    type: SanityTyper.ARRAY,
    name: BegrunnelseDokumentNavn.GIFT_PARTNERSKAP_TRIGGERE,
    of: [{ type: SanityTyper.STRING }],
    options: {
        list: giftPartnerskapTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
    },
    hidden: ({ document }: { document: Begrunnelse }) =>
        !(
            erNasjonalEllerInstitusjonsBegrunnelse(document) &&
            document.vilkaar?.includes(NasjonaleVilkår.GIFT_PARTNERSKAP)
        ),
    validation: (rule: Rule) => lagUtfyltNasjonaltFeltMenFeilRegelverkRegel(rule),
};
