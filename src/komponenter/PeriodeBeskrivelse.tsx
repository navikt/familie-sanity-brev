import * as React from 'react';
import { DokumentNavn } from '../util/typer';

export const PeriodeBeskrivelse = () => {
  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join('/');

  return (
    <div>
      Sysemet som tar i bruk denne malen vil fylle dette feltet med periodene som er relevant for
      brukeren. Perodene blir hentet fra sanity og er definert{' '}
      <a href={`${referenceBaseUrl}/${DokumentNavn.PERIODE}`}>her.</a>
    </div>
  );
};
