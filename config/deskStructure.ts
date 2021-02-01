import S from '@sanity/desk-tool/structure-builder';
import { hentFraSanity } from '../src/util/sanity';
import { GrDocumentText } from 'react-icons/gr';
import { ListItemBuilder } from '@sanity/structure/lib/ListItem';

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
      hentDelmalMappe(delmalHierarki, 'Delmal'),
      ...S.documentTypeListItems().filter(listItem => !['delmal'].includes(listItem.getId())),
    ]);
};

const hentDelmalMappe = (sti: ISti, stiNavn: string, tidligereIder: string[] = []) => {
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
    if (!tidligereIder.includes(dokument._id)) {
      dokumenter.push(
        S.listItem()
          .title(dokument.visningsnavn)
          .id(dokument._id)
          .icon(GrDocumentText)
          .child(
            S.document().schemaType('delmal').documentId(dokument._id).title(dokument.visningsnavn),
          ),
      );
      ider.push(dokument._id);
    }
  });

  const underMapper = sti.stier
    ? Object.keys(sti.stier).map(navn =>
        navn.length > 0
          ? hentDelmalMappe(sti.stier[navn], navn, ider)
          : hentDelmalMappe(sti.stier[navn], 'Mappe uten navn', ider),
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
