import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { erEøsBegrunnelse, hentEØSHjemmelRegler } from './eøsTriggere/utils';

export const hjemlerEØSForordningen883 = ['2', '11-16', '67', '68'];
export const hjemlerEØSForordningen987 = ['58', '60'];
export const hjemlerSeperasjonsavtalenStorbritannina = ['29'];

export const eøsHjemler = [
  {
    title: 'Hjemler fra EØS-forordning 883/2004',
    type: SanityTyper.ARRAY,
    name: BegrunnelseDokumentNavn.HJEMLER_EØS_FORORDNINGEN_833,
    of: [{ type: SanityTyper.STRING }],
    options: {
      layout: 'grid',
      list: hjemlerEØSForordningen883.map(hjemmel => ({ value: hjemmel, title: hjemmel })),
    },
    validation: rule => hentEØSHjemmelRegler(rule),
    hidden: context => !erEøsBegrunnelse(context.document),
  },
  {
    title: 'Hjemler fra EØS-forordning 987/2009',
    type: SanityTyper.ARRAY,
    name: BegrunnelseDokumentNavn.HJEMLER_EØS_FORORDNINGEN_987,
    of: [{ type: SanityTyper.STRING }],
    options: {
      layout: 'grid',
      list: hjemlerEØSForordningen987.map(hjemmel => ({ value: hjemmel, title: hjemmel })),
    },
    validation: rule => hentEØSHjemmelRegler(rule),
    hidden: context => !erEøsBegrunnelse(context.document),
  },
  {
    title: 'Hjemler fra Separasjonsavtalen mellom Storbritannia og Norge',
    type: SanityTyper.ARRAY,
    name: BegrunnelseDokumentNavn.HJEMLER_SEPERASJONSAVTALEN_STORBRITANNINA,
    of: [{ type: SanityTyper.STRING }],
    options: {
      layout: 'grid',
      list: hjemlerSeperasjonsavtalenStorbritannina.map(hjemmel => ({
        value: hjemmel,
        title: hjemmel,
      })),
    },
    validation: rule => hentEØSHjemmelRegler(rule),
    hidden: context => !erEøsBegrunnelse(context.document),
  },
];
