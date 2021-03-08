import S from '@sanity/desk-tool/structure-builder';
import { hentFraSanity } from '../src/util/sanity';
import { GrDocumentText } from 'react-icons/gr';
import { ListItemBuilder } from '@sanity/structure/lib/ListItem';

const DOKUMENTER = 'dokumenter';

interface IDelmal {
  mappe: string[] | null;
  visningsnavn: string;
  _id: string;
  _type: string;
}

type ISti = {
  [DOKUMENTER]: {
    visningsnavn: string;
    _id: string;
    _type: string;
  }[];
  stier: { [sti: string]: ISti } | {};
};

export default async () => {
  const delmalerMedStikkord: IDelmal[] = await hentFraSanity(
    '*[_type == "delmal" || _type == "avansertDelmal" ]{_type, mappe, visningsnavn, _id}',
    false,
    false,
  );

  const delmalHierarki: ISti = hentStier("delmal", delmalerMedStikkord);
  const avansertDelmalHierarki: ISti = hentStier("avansertDelmal", delmalerMedStikkord);

  return S.list()
    .title('Content')
    .items([
      hentDelmalMappe("delmal", delmalHierarki, 'Delmal'),
      ...S.documentTypeListItems().filter(listItem => !['delmal', 'avansertDelmal'].includes(listItem.getId())),
      hentDelmalMappe("avansertDelmal", avansertDelmalHierarki, 'Avansert delmal'),
    ]);
};

const hentDelmalMappe = (type, sti: ISti, stiNavn: string, tidligereIder: string[] = []) => {
  const fjernDraftsFraId = dokumenter =>
    dokumenter.map(dokument =>
      dokument._id.split('.')[0] === 'drafts'
        ? { ...dokument, _id: dokument._id.split('.')[1] }
        : dokument,
    );

  sti[DOKUMENTER] = fjernDraftsFraId(sti[DOKUMENTER]);

  const ider = tidligereIder;

  const dokumenter: ListItemBuilder[] = [];
  sti[DOKUMENTER].forEach(dokument => {
    if (dokument._type !== type) return;

    if (!tidligereIder.includes(dokument._id)) {
      dokumenter.push(
        S.listItem()
          .title(dokument.visningsnavn ? dokument.visningsnavn : 'Dokument uten navn')
          .id(dokument._id)
          .icon(GrDocumentText)
          .child(
            S.document()
              .schemaType(type)
              .documentId(dokument._id)
              .title(dokument.visningsnavn ? dokument.visningsnavn : 'Dokument uten navn'),
          ),  
      );

      ider.push(dokument._id);
    }
  });

  const underMapper = sti.stier
    ? Object.keys(sti.stier).map(navn =>
        navn.length > 0
          ? hentDelmalMappe(type, sti.stier[navn], navn, ider)
          : hentDelmalMappe(type, sti.stier[navn], 'Mappe uten navn', ider),
      )
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
  parent[DOKUMENTER].push({ _type: delmal._type, visningsnavn: delmal.visningsnavn, _id: delmal._id });
  return stier;
};

const hentStier = (type, delmaler: IDelmal[]): ISti => {
  let stier: ISti = { [DOKUMENTER]: [], stier: {} };
  delmaler.forEach(delmal => {
    if (delmal._type !== type) return;

    if (delmal.mappe) {
      stier = leggTilSti(delmal, stier);
    } else {
      stier[DOKUMENTER].push({ _type: delmal._type, visningsnavn: delmal.visningsnavn, _id: delmal._id });
    }
  });

  return stier;
};
