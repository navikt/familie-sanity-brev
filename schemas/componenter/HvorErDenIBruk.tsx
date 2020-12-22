import * as React from 'react';
import styled from 'styled-components';
import { useSanityQuery } from '../../utils/sanity';

const Header = styled.div`
  font-size: 1.25rem;
`;

const ErrorStyling = styled(Header)`
  color: red;
`;

type IReferrer = {
  stikkord?: string[];
  id: string;
  _id: string;
  _type: string;
};

function HvorErDenIBruk(props: any) {
  const documentId = window.location.pathname.split(';').reverse()[0].slice(0, 36);

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
        <span role="img" aria-label="Gråteemoji">
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
          return (
            <li key={ref._id}>
              <a href={`${referenceBaseUrl}/${ref._type};${stikkord}${ref._id}`}>{ref.id}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HvorErDenIBruk;
