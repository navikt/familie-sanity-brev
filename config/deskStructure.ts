import S from '@sanity/desk-tool/structure-builder';
import { hentFraSanity } from '../src/util/sanity';
import { GrDocumentText } from 'react-icons/gr';
import { ListItemBuilder } from '@sanity/structure/lib/ListItem';

const DOKUMENTER = 'dokumenter';

interface IDokument {
  mappe: string[] | null;
  visningsnavn: string;
  _id: string;
  _type: string;
}

type IMappe = {
  [DOKUMENTER]: {
    visningsnavn: string;
    _id: string;
    _type: string;
  }[];
  mapper: { [mappe: string]: IMappe } | {};
};

export default async () => {
  const mappestrukturDokumenter: IDokument[] = await hentFraSanity(
    '*[_type == "delmal" || _type == "avansertDelmal" || _type == "begrunnelse" ]{_type, mappe, visningsnavn, _id}',
    false,
    false,
  );

  const delmalHierarki: IMappe = hentMapper('delmal', mappestrukturDokumenter);
  const avansertDelmalHierarki: IMappe = hentMapper('avansertDelmal', mappestrukturDokumenter);
  const begrunnelseHierarki: IMappe = hentMapper('begrunnelse', mappestrukturDokumenter);

  return S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        listItem => !['delmal', 'avansertDelmal', 'begrunnelse'].includes(listItem.getId()),
      ),
      hentDokumentMappe('delmal', delmalHierarki, 'Delmal'),
      hentDokumentMappe('avansertDelmal', avansertDelmalHierarki, 'Avansert delmal'),
      hentDokumentMappe('begrunnelse', begrunnelseHierarki, 'Begrunnelse'),
    ]);
};

const hentDokumentMappe = (
  type,
  mappe: IMappe,
  mappeNavn: string,
  tidligereIder: string[] = [],
) => {
  const fjernDraftsFraId = dokumenter =>
    dokumenter.map(dokument =>
      dokument._id.split('.')[0] === 'drafts'
        ? { ...dokument, _id: dokument._id.split('.')[1] }
        : dokument,
    );

  mappe[DOKUMENTER] = fjernDraftsFraId(mappe[DOKUMENTER]);

  const ider = tidligereIder;

  const dokumenter: ListItemBuilder[] = [];
  mappe[DOKUMENTER].forEach(dokument => {
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

  const underMapper = mappe.mapper
    ? Object.keys(mappe.mapper).map(navn =>
        navn.length > 0
          ? hentDokumentMappe(type, mappe.mapper[navn], navn, ider)
          : hentDokumentMappe(type, mappe.mapper[navn], 'Mappe uten navn', ider),
      )
    : [];

  return S.listItem()
    .title(mappeNavn)
    .child(
      S.list()
        .title(mappeNavn)
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

const leggTilMappe = (delmal: IDokument, mapper: IMappe): IMappe => {
  let parent = mapper;
  for (let index = 0; index < delmal.mappe.length; index++) {
    const mappeNavn = capitalize(trimStreng(delmal.mappe[index]));
    if (!parent.mapper[mappeNavn]) {
      parent.mapper[mappeNavn] = {
        [DOKUMENTER]: [],
        mapper: {},
      };
    }
    parent = parent.mapper[mappeNavn];
  }
  parent[DOKUMENTER].push({
    _type: delmal._type,
    visningsnavn: delmal.visningsnavn,
    _id: delmal._id,
  });
  return mapper;
};

const hentMapper = (type, delmaler: IDokument[]): IMappe => {
  let mapper: IMappe = { [DOKUMENTER]: [], mapper: {} };
  delmaler.forEach(delmal => {
    if (delmal._type !== type) return;

    if (delmal.mappe) {
      mapper = leggTilMappe(delmal, mapper);
    } else {
      mapper[DOKUMENTER].push({
        _type: delmal._type,
        visningsnavn: delmal.visningsnavn,
        _id: delmal._id,
      });
    }
  });

  return mapper;
};
