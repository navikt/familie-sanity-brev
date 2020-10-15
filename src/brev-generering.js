const blocksToHtml = require("@sanity/block-content-to-html");
const blocksToHyperScript = require("@sanity/block-content-to-hyperscript");
const client = require("@sanity/client")({
  projectId: "xsrv1mh6",
  dataset: "testdata",
  useCdn: true
});


const hjemler = [1, 2, 3]
const duFaar = {"fom": "placeholder fomDato",
  "tom": "placeholder tomDato",
  "belop": "placeholder beløp",
  "antallBarn": 3,
  "barnasFodselsdatoer": "placeholder barnas fødselsdatoer",
  "begrunnelser": ["INNVILGET_BOSATT_I_RIKTET"]
}


const getFirstMal = async () => {

  return client
    .fetch('*[_type == "mal" && mal_navn=="Innvilget"]{mal_tittel, "submaler": mal_block[]->.submal_block}')
    .then(mal => {
      return mal;
    });
};

module.exports.lagHtml = getFirstMal;
