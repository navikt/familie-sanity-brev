import S from '@sanity/desk-tool/structure-builder';
import { hentFraSanity } from '../src/util/sanity';
import { GrDocumentText } from 'react-icons/gr';
import { ListItemBuilder } from '@sanity/structure/lib/ListItem';
import { ekskluderesForBa, ekskluderesForEf, ekskluderesForKs, erBa, erEf, erKs } from './felles';
import { BegrunnelseDokumentNavn, DokumentNavn } from '../src/util/typer';
import ComposeIcon from 'part:@sanity/base/compose-icon';
import { uuid } from '@sanity/uuid';

const DOKUMENTER = 'dokumenter';

interface IDokument {
  mappe?: string[] | null;
  visningsnavn: string;
  _id: string;
  _type: string;
  begrunnelsetype: string | null;
  behandlingstema: string | null;
}

type IMappe = {
  [DOKUMENTER]: IDokument[];
  mapper: { [mappe: string]: IMappe } | Record<string, never>;
};

export default async () => {
  const mappestrukturDokumenter: IDokument[] = await hentFraSanity(
    '*[_type == "delmal" || _type == "avansertDelmal" || _type == "begrunnelse" || _type == "ksBegrunnelse" ]',
    false,
    false,
  );

  const delmalHierarki: IMappe = hentMapper('delmal', mappestrukturDokumenter);
  const avansertDelmalHierarki: IMappe = hentMapper('avansertDelmal', mappestrukturDokumenter);
  const begrunnelseHierarki: IMappe = hentMapper('begrunnelse', mappestrukturDokumenter);
  const ksBegrunnelseHierarki: IMappe = hentMapperKsBegrunnelse(
    'ksBegrunnelse',
    mappestrukturDokumenter,
  );

  const skalBrukeSanitySinStruktur = listItem =>
    ![
      BegrunnelseDokumentNavn.BA_BEGRUNNELSE,
      BegrunnelseDokumentNavn.KS_BEGRUNNELSE,
      DokumentNavn.DELMAL,
      DokumentNavn.AVANSERT_DELMAL,
      ...(erEf() ? ekskluderesForEf : []),
      ...(erBa() ? ekskluderesForBa : []),
      ...(erKs() ? ekskluderesForKs : []),
    ].includes(listItem.getId());

  return S.list()
    .title('Content')
    .items([
      hentDokumentMappe('delmal', delmalHierarki, 'Delmal'),
      ...S.documentTypeListItems().filter(skalBrukeSanitySinStruktur),
      ...(erEf() ? [hentDokumentMappe('avansertDelmal', avansertDelmalHierarki, 'Innhold')] : []),
      ...(erBa() ? [hentDokumentMappe('begrunnelse', begrunnelseHierarki, 'Begrunnelse BA')] : []),
      ...(erKs()
        ? [hentDokumentMappe('ksBegrunnelse', ksBegrunnelseHierarki, 'Begrunnelse KS')]
        : []),
    ]);
};

const hentDokumentMappe = (
  type,
  mappe: IMappe,
  mappeNavn: string,
  tidligereIder: string[] = [],
): ListItemBuilder => {
  const fjernDraftsFraId = dokumenter =>
    dokumenter.map(dokument =>
      dokument._id.split('.')[0] === 'drafts'
        ? { ...dokument, _id: dokument._id.split('.')[1] }
        : dokument,
    );

  const relevanteDokumenter = fjernDraftsFraId(mappe[DOKUMENTER]);

  type === 'ksBegrunnelse' && console.log(relevanteDokumenter);
  const sorterteRelevanteDokumenter = sorterBegrunnelseDokumenter(relevanteDokumenter, type);

  const ider = tidligereIder;

  const dokumenter: ListItemBuilder[] = [];
  sorterteRelevanteDokumenter.forEach(dokument => {
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
        .menuItems(lagNyMenyknapp(type))
        .title(mappeNavn)
        .items([...underMapper, ...dokumenter]),
    );
};

const sorterBegrunnelseDokumenter = (dokumenter: IDokument[], type): IDokument[] => {
  if (type === 'begrunnelse') {
    return dokumenter.sort((a, b) =>
      a?.visningsnavn && b?.visningsnavn
        ? hentFørsteTallIStartAvTekst(a.visningsnavn) - hentFørsteTallIStartAvTekst(b.visningsnavn)
        : -1,
    );
  } else {
    return dokumenter;
  }
};

const hentFørsteTallIStartAvTekst = (tekst: string): number => {
  const tallIStartenAvTekst = parseInt(tekst.replace(/(^\d+)(.+$)/i, '$1'));
  return isNaN(tallIStartenAvTekst) ? -1 : tallIStartenAvTekst;
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
    behandlingstema: delmal.behandlingstema,
    begrunnelsetype: delmal.begrunnelsetype,
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
        behandlingstema: delmal.behandlingstema,
        begrunnelsetype: delmal.begrunnelsetype,
      });
    }
  });

  return mapper;
};

const hentMapperKsBegrunnelse = (type, delmaler: IDokument[]): IMappe => {
  let mapper: IMappe = { [DOKUMENTER]: [], mapper: {} };

  delmaler
    .filter(delmal => delmal._type === type)
    .map(delmal => ({
      ...delmal,
      mappe: [delmal.behandlingstema, delmal.begrunnelsetype].concat(delmal.mappe).filter(x => !!x),
    }))
    .forEach(delmal => {
      if (delmal.mappe) {
        mapper = leggTilMappe(delmal, mapper);
      } else {
        mapper[DOKUMENTER].push({
          _type: delmal._type,
          visningsnavn: delmal.visningsnavn,
          _id: delmal._id,
          behandlingstema: delmal.behandlingstema,
          begrunnelsetype: delmal.begrunnelsetype,
        });
      }
    });

  return mapper;
};

const lagNyMenyknapp = (type: string, prefix?: string) => {
  prefix = prefix ?? type;
  return [
    S.menuItem()
      .title('Lag ny')
      .icon(ComposeIcon)
      .intent({
        type: 'create',
        params: { type, id: `${prefix}.${uuid()}` },
      })
      .showAsAction(true),
  ];
};
