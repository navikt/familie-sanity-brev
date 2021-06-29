import * as React from 'react';
import styled from 'styled-components';
import { useSanityQuery } from '../util/sanity';

const Header = styled.div`
  font-size: 1.25rem;
`;

const ErrorStyling = styled(Header)`
  color: #f03e2f;
`;

type IReferrer = {
  stikkord?: string[];
  visningsnavn: string;
  _id: string;
  _type: string;
};

function hvorErFlettefeltetIBruk(props: any) {
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
    return <div>Sjekker om delmalen er i bruk..</div>;
  }

  if (!data.length) {
    return <Header {...props}>Dette flettefeltet er ikke i bruk.</Header>;
  }

  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join('/');

  const antallUnike = data.length - data.filter(ref => ref._id.includes('drafts')).length;

  return (
    <div {...props}>
      <div>Dette flettefeltet er i bruk {antallUnike} steder:</div>
      <ul>
        {data.map((ref: IReferrer) => {
          const stikkord = ref.stikkord ? ref.stikkord.join(';') + ';' : '';
          const erRefDraft = ref._id.includes('drafts');

          console.log('ref', ref);
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

export default hvorErFlettefeltetIBruk;
