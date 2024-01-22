import { hentFraSanity } from '../src/util/sanity';
import { GrDocumentText } from 'react-icons/gr';
import { ekskluderesForBa, ekskluderesForEf, ekskluderesForKs, erBa, erEf, erKs } from './felles';
import {
  BegrunnelseDokumentNavn,
  DokumentNavn,
  KSBegrunnelseDokumentNavn,
} from '../src/util/typer';
import { ComposeIcon } from '@sanity/icons';
import { uuid } from '@sanity/uuid';
import { resultatValg } from '../src/schemas/baks/begrunnelse/ks-sak/resultat';
import { temaValg } from '../src/schemas/baks/begrunnelse/ks-sak/tema';
import { typeValg } from '../src/schemas/baks/begrunnelse/ks-sak/type';
import {
  Valgbarhet,
  valgbarhetTilMenyValg,
} from '../src/schemas/baks/begrunnelse/ba-sak/sanityMappeFelt/valgbarhet';
import { ListItemBuilder, StructureBuilder } from 'sanity/structure';
import {
  Regelverk,
  regelverkTilMenyValg,
} from '../src/schemas/baks/begrunnelse/ba-sak/sanityMappeFelt/regelverk';
import {
  PerioderesultatForPerson,
  periodeResultatForPersonTilMenyValg,
} from '../src/schemas/baks/begrunnelse/ba-sak/sanityMappeFelt/perioderesultatForPerson';

interface IDokument {
  mappe?: string[] | null;
  visningsnavn: string;
  _id: string;
  _type: string;
}

interface IBegrunnelse extends IDokument {
  periodeResultatForPerson?: PerioderesultatForPerson;
  regelverk?: Regelverk;
  valgbarhet?: Valgbarhet;
}

interface IKSBegrunnelse extends IDokument {
  resultat: string | null;
  tema: string | null;
  type: string | null;
}

type IMappe = {
  dokumenter: IDokument[];
  undermapper: Record<string, IMappe> | Record<string, never>;
};

export const structure = async (S: StructureBuilder) => {
  const delmaler: IDokument[] = await hentFraSanity(
    '*[_type == "delmal" || _type == "avansertDelmal"]',
    false,
    false,
  );

  const begrunnelser: IBegrunnelse[] = await hentFraSanity(
    '*[_type == "begrunnelse"]',
    false,
    false,
  );

  const ksBegrunnelser: IKSBegrunnelse[] = await hentFraSanity(
    '*[_type == "ksBegrunnelse"]',
    false,
    false,
  );

  const delmalHierarki: IMappe = hentMapper('delmal', delmaler);
  const avansertDelmalHierarki: IMappe = hentMapper('avansertDelmal', delmaler);
  const begrunnelseHierarki: IMappe = hentMapper('begrunnelse', begrunnelser);
  const baBegrunnelseHierarki: IMappe = hentMapperBaBegrunnelse('begrunnelse', begrunnelser);
  const ksBegrunnelseHierarki: IMappe = hentMapperKsBegrunnelse('ksBegrunnelse', ksBegrunnelser);

  const skalBrukeSanitySinStruktur = listItem =>
    ![
      BegrunnelseDokumentNavn.BA_BEGRUNNELSE,
      KSBegrunnelseDokumentNavn.KS_BEGRUNNELSE,
      DokumentNavn.DELMAL,
      DokumentNavn.AVANSERT_DELMAL,
      ...(erEf() ? ekskluderesForEf : []),
      ...(erBa() ? ekskluderesForBa : []),
      ...(erKs() ? ekskluderesForKs : []),
    ].includes(listItem.getId());

  return S.list()
    .title('Content')
    .items([
      hentDokumentMappe(S, 'delmal', delmalHierarki, 'Delmal'),
      ...S.documentTypeListItems().filter(skalBrukeSanitySinStruktur),
      ...(erEf()
        ? [hentDokumentMappe(S, 'avansertDelmal', avansertDelmalHierarki, 'Innhold')]
        : []),
      ...(erBa()
        ? [
            hentDokumentMappe(S, 'begrunnelse', begrunnelseHierarki, 'Begrunnelse BA'),
            hentDokumentMappe(S, 'begrunnelse', baBegrunnelseHierarki, 'Begrunnelse BA Beta'),
          ]
        : []),
      ...(erKs()
        ? [hentDokumentMappe(S, 'ksBegrunnelse', ksBegrunnelseHierarki, 'Begrunnelse KS')]
        : []),
    ]);
};

const hentDokumentMappe = (
  S: StructureBuilder,
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

  const relevanteDokumenter = fjernDraftsFraId(mappe.dokumenter);

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

  const undermapper = mappe.undermapper
    ? Object.keys(mappe.undermapper).map(navn =>
        navn.length > 0
          ? hentDokumentMappe(S, type, mappe.undermapper[navn], navn, ider)
          : hentDokumentMappe(S, type, mappe.undermapper[navn], 'Mappe uten navn', ider),
      )
    : [];

  return S.listItem()
    .title(mappeNavn)
    .child(
      S.list()
        .menuItems(lagNyMenyknapp(S, type))
        .title(mappeNavn)
        .items([...undermapper, ...dokumenter]),
    );
};

const sorterBegrunnelseDokumenter = (dokumenter: IDokument[], type): IDokument[] => {
  if (type === 'begrunnelse' || type === 'ksBegrunnelse') {
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

const trimAndCapitalize = (mappenavn: string) => capitalize(trimStreng(mappenavn));

const leggTilMappe = (
  delmal: IDokument,
  mapper: IMappe,
  mappenavnTransformator: (mappeNavn: string) => string = trimAndCapitalize,
): IMappe => {
  let parent = mapper;
  for (let index = 0; index < delmal.mappe.length; index++) {
    const mappeNavn = mappenavnTransformator(delmal.mappe[index]);
    if (!parent.undermapper[mappeNavn]) {
      parent.undermapper[mappeNavn] = {
        dokumenter: [],
        undermapper: {},
      };
    }
    parent = parent.undermapper[mappeNavn];
  }
  parent.dokumenter.push({
    _type: delmal._type,
    visningsnavn: delmal.visningsnavn,
    _id: delmal._id,
  });
  return mapper;
};

const hentMapper = (type, delmaler: IDokument[]): IMappe => {
  let mapper: IMappe = { dokumenter: [], undermapper: {} };
  delmaler.forEach(delmal => {
    if (delmal._type !== type) return;

    if (delmal.mappe) {
      mapper = leggTilMappe(delmal, mapper);
    } else {
      mapper.dokumenter.push({
        _type: delmal._type,
        visningsnavn: delmal.visningsnavn,
        _id: delmal._id,
      });
    }
  });

  return mapper;
};

const hentMapperBaBegrunnelse = (type, begrunnelser: IBegrunnelse[]): IMappe => {
  const begrunnelserAvRiktigType = begrunnelser.filter(begrunnelse => begrunnelse._type === type);

  const begrunnelserMedTypeOgTemaSomMappe = begrunnelserAvRiktigType.map(begrunnelse => {
    const begrunnelseHarTemaOgTypeOgResultat =
      !!begrunnelse.periodeResultatForPerson && !!begrunnelse.regelverk && !!begrunnelse.valgbarhet;

    const mappehierarkiForBegrunnelse: string[] = begrunnelseHarTemaOgTypeOgResultat
      ? [
          periodeResultatForPersonTilMenyValg(begrunnelse.periodeResultatForPerson).title,
          regelverkTilMenyValg(begrunnelse.regelverk).title,
          valgbarhetTilMenyValg(begrunnelse.valgbarhet).title,
        ]
      : [];

    return {
      ...begrunnelse,
      mappe: mappehierarkiForBegrunnelse,
    };
  });

  return begrunnelserMedTypeOgTemaSomMappe.reduce((acc: IMappe, begrunnelse: IDokument): IMappe => {
    if (begrunnelse.mappe) {
      return leggTilMappe(begrunnelse, acc, mappenavn => mappenavn);
    } else {
      return {
        ...acc,
        dokumenter: [
          ...acc.dokumenter,
          {
            _type: begrunnelse._type,
            visningsnavn: begrunnelse.visningsnavn,
            _id: begrunnelse._id,
          },
        ],
      };
    }
  }, tomMappe);
};

const tomMappe: IMappe = { dokumenter: [], undermapper: {} };

const hentMapperKsBegrunnelse = (type, begrunnelser: IKSBegrunnelse[]): IMappe => {
  const begrunnelserAvRiktigType = begrunnelser.filter(begrunnelse => begrunnelse._type === type);

  const begrunnelserMedTypeOgTemaSomMappe = begrunnelserAvRiktigType.map(begrunnelse => {
    const begrunnelseHarTemaOgType =
      !!begrunnelse.resultat && !!begrunnelse.tema && !!begrunnelse.type;

    const mappehierarkiForBegrunnelse = begrunnelseHarTemaOgType
      ? [
          resultatValg[begrunnelse.resultat].title,
          temaValg[begrunnelse.tema].title,
          typeValg[begrunnelse.type].title,
        ]
      : [];

    return {
      ...begrunnelse,
      mappe: mappehierarkiForBegrunnelse,
    };
  });

  return begrunnelserMedTypeOgTemaSomMappe.reduce((acc: IMappe, begrunnelse: IDokument): IMappe => {
    if (begrunnelse.mappe) {
      return leggTilMappe(begrunnelse, acc, mappenavn => mappenavn);
    } else {
      return {
        ...acc,
        dokumenter: [
          ...acc.dokumenter,
          {
            _type: begrunnelse._type,
            visningsnavn: begrunnelse.visningsnavn,
            _id: begrunnelse._id,
          },
        ],
      };
    }
  }, tomMappe);
};

const lagNyMenyknapp = (S: StructureBuilder, type: string, prefix?: string) => {
  prefix = prefix ?? type;
  return [
    S.menuItem()
      .title('Lag ny')
      .icon(ComposeIcon)
      .intent({
        type: 'create',
        params: { type, id: `${prefix}-${uuid()}` },
      })
      .showAsAction(true),
  ];
};
