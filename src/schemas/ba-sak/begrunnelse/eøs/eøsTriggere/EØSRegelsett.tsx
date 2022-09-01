import { DokumentNavn, EØSRegelsettDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { hentRegelForSkjulteFelter } from '../../hentRegelForSkjulteFelter';
import { eøsBegrunnelseTriggere } from '../../triggesAv';
import HvorErDenIBruk from '../../../../../komponenter/HvorErDenIBruk/HvorErDenIBruk';

const eøsRegelsett = {
  title: 'Regelsett EØS',
  name: EØSRegelsettDokumentNavn.EØS_REGELSETT,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },

  validation: hentRegelForSkjulteFelter(),

  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: rule => [rule.required().error('Dokumentet må ha et navn')],
    },

    {
      name: 'hvorErDenIBruk',
      type: SanityTyper.STRING,
      inputComponent: HvorErDenIBruk,
    },

    ...eøsBegrunnelseTriggere,
  ],
};

export default eøsRegelsett;
