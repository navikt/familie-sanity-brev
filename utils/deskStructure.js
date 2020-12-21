import S from "@sanity/desk-tool/structure-builder";
import { hentFraSanity } from "./sanity";
import { GrDocumentText } from "react-icons/gr";

const DOKUMENTER = "Dokumenter";

export default async () => {
  const delmalerMedStikkord = await hentFraSanity(
    '*[_type == "delmal" ]{stikkord, id, _id}',
    false
  );

  const dokumentHierarki = hentStier(delmalerMedStikkord);

  return S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !["delmal"].includes(listItem.getId())
      ),
      hentDelmalMappe(dokumentHierarki, "Delmal"),
    ]);
};

const hentDelmalMappe = (sti, stiNavn) => {
  const dokumenter = sti[DOKUMENTER].map((dokument) =>
    S.listItem()
      .title(dokument.id)
      .id(dokument._id)
      .icon(GrDocumentText)
      .child(S.document().schemaType("delmal").documentId(dokument._id))
  );

  const underMapper = Object.keys(sti)
    .filter((stiNavn) => stiNavn !== DOKUMENTER)
    .map((stiNavn) => hentDelmalMappe(sti[stiNavn], stiNavn));

  return S.listItem()
    .title(stiNavn)
    .child(
      S.list()
        .title(stiNavn)
        .items([...underMapper, ...dokumenter])
    );
};

const trimStreng = (tekst) => {
  return String(tekst).replace(/^\s+|\s+$/g, "");
};

const leggTilSti = (delmal, stier) => {
  let parent = stier;
  for (let index = 0; index < delmal.stikkord.length; index++) {
    let stiNavn = trimStreng(delmal.stikkord[index].toLowerCase());
    if (!parent[stiNavn]) {
      parent[stiNavn] = { [DOKUMENTER]: [] };
    }
    parent = parent[stiNavn];
  }
  parent[DOKUMENTER].push({ id: delmal.id, _id: delmal._id });
};

const hentStier = (delmaler) => {
  let stier = {};
  stier[DOKUMENTER] = [];
  delmaler.forEach((delmal) => {
    if (delmal.stikkord) {
      leggTilSti(delmal, stier);
    } else {
      stier[DOKUMENTER].push({ id: delmal.id, _id: delmal._id });
    }
  });

  return stier;
};
