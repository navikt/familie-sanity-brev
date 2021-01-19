import S from '@sanity/desk-tool/structure-builder';
import { hentFraSanity } from './sanity';
import { GrDocumentText } from 'react-icons/gr';

const DOKUMENTER = 'dokumenter';

interface IDelmal {
  mappe: string[] | null;
  visningsnavn: string;
  _id: string;
}

type ISti = {
  [DOKUMENTER]: {
    visningsnavn: string;
    _id: string;
  }[];
  stier: { [sti: string]: ISti } | {};
};

export default async () => {
  const delmalerMedStikkord: IDelmal[] = await hentFraSanity(
    '*[_type == "delmal" ]{mappe, visningsnavn, _id}',
    false,
    false,
  );

  const delmalHierarki: ISti = hentStier(delmalerMedStikkord);

  return S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(listItem => !['delmal'].includes(listItem.getId())),
      hentDelmalMappe(delmalHierarki, 'Delmal'),
    ]);
};

const hentDelmalMappe = (sti: ISti, stiNavn: string) => {
  const dokumenter = sti[DOKUMENTER].filter(
    dokument => dokument._id.split('.')[0] !== 'drafts',
  ).map(dokument =>
    S.listItem()
      .title(dokument.visningsnavn)
      .id(dokument._id)
      .icon(GrDocumentText)
      .child(
        S.document().schemaType('delmal').documentId(dokument._id).title(dokument.visningsnavn),
      ),
  );

  const underMapper = sti.stier
    ? Object.keys(sti.stier).map(navn => hentDelmalMappe(sti.stier[navn], navn))
    : [];

  return S.listItem()
    .title(stiNavn)
    .child(
      S.list()
        .title(stiNavn)
        .items([...underMapper, ...dokumenter]),
    );
};

const trimStreng = (tekst: string) => {
  return String(tekst).replace(/^\s+|\s+$/g, '');
};

const capitalize = (tekst: string) => {
  if (tekst.length === 0) {
    return '';
  }
  return tekst.toLowerCase().replace(/^./, str => str.toUpperCase());
};

const leggTilSti = (delmal: IDelmal, stier: ISti): ISti => {
  let parent = stier;
  for (let index = 0; index < delmal.mappe.length; index++) {
    const stiNavn = capitalize(trimStreng(delmal.mappe[index]));
    if (!parent.stier[stiNavn]) {
      parent.stier[stiNavn] = {
        [DOKUMENTER]: [],
        stier: {},
      };
    }
    parent = parent.stier[stiNavn];
  }
  parent[DOKUMENTER].push({ visningsnavn: delmal.visningsnavn, _id: delmal._id });
  return stier;
};

const hentStier = (delmaler: IDelmal[]): ISti => {
  let stier: ISti = { [DOKUMENTER]: [], stier: {} };
  delmaler.forEach(delmal => {
    if (delmal.mappe) {
      stier = leggTilSti(delmal, stier);
    } else {
      stier[DOKUMENTER].push({ visningsnavn: delmal.visningsnavn, _id: delmal._id });
    }
  });

  return stier;
};
