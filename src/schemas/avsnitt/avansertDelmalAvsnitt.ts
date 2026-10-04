import { Rule } from 'sanity';
import DelmalBlockComponent from '../../komponenter/DelmalBlockComponent';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { AvansertDelmalFelter } from '../annonteringer/AvansertDelmalAnnontering';

export const avansertDelmalAvsnitt = (maalform: any) => ({
    title: 'Avansert delmal',
    name: DokumentNavn.DELMAL_BLOCK,
    type: SanityTyper.OBJECT,
    fields: [...AvansertDelmalFelter(true)],
    validation: (rule: Rule) => [rule.required().error('Ingen delmal valgt')],
    preview: {
        select: {
            delmalReferanse: `${DokumentNavn.DELMAL_REFERANSE}`,
        },
    },
    components: {
        preview: (props: any) => DelmalBlockComponent(props, maalform, props?.delmalReferanse?._ref),
    },
});
