import * as React from 'react';
import { useSanityQuery } from '../../util/sanity';
import { Header, ErrorStyling } from './Elementer';

type IReferrer = {
  stikkord?: string[];
  visningsnavn: string;
  _id: string;
  _type: string;
};

/* Ser på nettleseren sin URL for å utlede dokumentId. URLen ser slik ut i de tre tilfellene:
Avanserte delmaler:
https://familie-brev.sanity.studio/ef-brev/structure/innhold;avansertDelmal-a8530c4d-b70c-4eaa-a7a1-e6b810fb06bd

Vanlige delmaler:
https://familie-brev.sanity.studio/ef-brev/structure/innhold;0e92ea3a-0ab9-45d9-9092-0db1a7adc58d

Når man oppretter en ny delmal:
https://familie-brev.sanity.studio/ef-brev/structure/__edit__avansertDelmal-9236b142-e196-4d5d-ae2a-5f576b8f36bf%2Ctemplate%3DavansertDelmal%2Ctype%3DavansertDelmal
*/
const utledDokumentId = (): string => {
  const url = window.location.pathname;

  if (url.includes(';avansertDelmal')) {
    return url.split(';').reverse()[0].slice(0, 51);
  } else if (url.includes(';')) {
    return url.split(';').reverse()[0].slice(0, 36);
  }
  return url.split('__edit__').reverse()[0].slice(0, 36);
};

function HvorErDelmalenIBruk(props: any) {
  const documentId = utledDokumentId();

  const query = `*[references("${documentId}")]`;
  const { data, error } = useSanityQuery(query);

  if (error) {
    console.error(error);
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>;
  }

  if (!data) {
    return <div>Sjekker om delmalen er i bruk..</div>;
  }

  if (!data.length) {
    return (
      <Header {...props}>
        Denne delmalen er ikke i bruk{' '}
        <span role="img" aria-label="Gråte-emoji">
          😢
        </span>
      </Header>
    );
  }

  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join('/');

  return (
    <div {...props}>
      <div>Denne delmalen er brukt {data.length} steder:</div>
      <ul>
        {data.map((ref: IReferrer) => {
          const stikkord = ref.stikkord ? ref.stikkord.join(';') + ';' : '';
          const erRefDraft = ref._id.includes('drafts');

          return (
            !erRefDraft && (
              <li key={ref._id}>
                <a href={`${referenceBaseUrl}/${ref._type};${stikkord}${ref._id}`}>
                  {ref.visningsnavn}
                </a>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}

export default HvorErDelmalenIBruk;
