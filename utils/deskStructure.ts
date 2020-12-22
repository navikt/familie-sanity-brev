import S from "@sanity/desk-tool/structure-builder";
import { hentFraSanity } from "./sanity";
import { GrDocumentText } from "react-icons/gr";

const DOKUMENTER = "dokumenter";

interface IDelmal {
  stikkord: string | null;
  id: string;
  _id: string;
}

type ISti = {
  [DOKUMENTER]: {
    id: string;
    _id: string;
  }[];
  stier?: { [sti: string]: ISti };
};

export default async () => {
  const delmalerMedStikkord: IDelmal[] = await hentFraSanity(
    '*[_type == "delmal" ]{stikkord, id, _id}',
    false
  );

  const dokumentHierarki: ISti = hentStier(delmalerMedStikkord);

  return S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !["delmal"].includes(listItem.getId())
      ),
      hentDelmalMappe(dokumentHierarki, "Delmal"),
    ]);
};

const hentDelmalMappe = (sti: ISti, stiNavn: string) => {
  const dokumenter = sti[DOKUMENTER].map((dokument) =>
    S.listItem()
      .title(dokument.id)
      .id(dokument._id)
      .icon(GrDocumentText)
      .child(S.document().schemaType("delmal").documentId(dokument._id))
  );

  const underMapper = sti.stier
    ? Object.keys(sti.stier).map((navn) =>
        hentDelmalMappe(sti.stier[navn], navn)
      )
    : [];

  return S.listItem()
    .title(stiNavn)
    .child(
      S.list()
        .title(stiNavn)
        .items([...underMapper, ...dokumenter])
    );
};

const trimStreng = (tekst: string) => {
  return String(tekst).replace(/^\s+|\s+$/g, "");
};

const capitalize = (tekst: string) => {
  if (tekst.length === 0) {
    return "";
  }
  return tekst.toLowerCase().replace(/^./, (str) => str.toUpperCase());
};

const leggTilSti = (delmal: IDelmal, stier: ISti) => {
  let parent = stier;
  for (let index = 0; index < delmal.stikkord.length; index++) {
    let stiNavn = capitalize(trimStreng(delmal.stikkord[index]));
    if (!parent.stier) {
      parent.stier = { [stiNavn]: { [DOKUMENTER]: [] } };
    } else if (!parent.stier[stiNavn]) {
      parent.stier[stiNavn] = { [DOKUMENTER]: [] };
    }
    parent = parent.stier[stiNavn];
  }
  parent[DOKUMENTER].push({ id: delmal.id, _id: delmal._id });
  return stier;
};

const hentStier = (delmaler: IDelmal[]): ISti => {
  let stier = { [DOKUMENTER]: [] };
  delmaler.forEach((delmal) => {
    if (delmal.stikkord) {
      stier = leggTilSti(delmal, stier);
    } else {
      stier[DOKUMENTER].push({ id: delmal.id, _id: delmal._id });
    }
  });

  return stier;
};
