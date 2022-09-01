import * as React from 'react';
import { useSanityQuery } from '../../util/sanity';
import { Header, ErrorStyling } from './Elementer';

type IReferrer = {
  stikkord?: string[];
  mappe?: string[];
  visningsnavn: string;
  _id: string;
  _type: string;
};

const æøåTilEoaa = (text: string) => text.replace('æ', 'e').replace('ø', 'o').replace('å', 'aa');

function HvorErDenIBruk(props: any) {
  const url = window.location.pathname;
  const documentId = url.includes(';')
    ? url.split(';').reverse()[0].slice(0, 36)
    : url.split('__edit__').reverse()[0].slice(0, 36);

  const query = `*[references("${documentId}")]`;
  const { data, error } = useSanityQuery(query);

  if (error) {
    console.error(error);
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>;
  }

  if (!data) {
    return <div>Sjekker om dokumentet er i bruk..</div>;
  }

  if (!data.length) {
    return (
      <Header {...props}>
        Dette dokumentet er ikke i bruk{' '}
        <span role="img" aria-label="Gråte-emoji">
          😢
        </span>
      </Header>
    );
  }

  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join('/');

  return (
    <div {...props}>
      <div>Dette dokumentet er brukt {data.length} steder:</div>
      <ul>
        {data.map((ref: IReferrer) => {
          const stikkord = ref.stikkord ? ref.stikkord.join(';') + ';' : '';
          const mappe = ref.mappe
            ? ref.mappe.map(tekst => æøåTilEoaa(tekst.toLowerCase())).join(';') + ';'
            : '';
          const erRefDraft = ref._id.includes('drafts');

          return (
            !erRefDraft && (
              <li key={ref._id}>
                <a href={`${referenceBaseUrl}/${ref._type};${stikkord}${mappe}${ref._id}`}>
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

export default HvorErDenIBruk;
