import styled from 'styled-components';
import * as React from 'react';
import { Formuleringstype } from './typer';

export const Formuleringer = () => {
  return (
    <>
      <Hovedoverskrift>Forklaring av formuleringer</Hovedoverskrift>
      <Formulering formulering={Formuleringstype.FOR_BARN_FØDT} />
      <Formulering formulering={Formuleringstype.DU_ELLER_DU_OG_BARNA} />
    </>
  );
};

const Formulering = ({ formulering }: { formulering: Formuleringstype }) => {
  return (
    <div>
      <Overskrift>{formulering}:</Overskrift>
      <div>{hentFormulering(formulering)}</div>
    </div>
  );
};

const hentFormulering = (formuleringstype: Formuleringstype) => {
  switch (formuleringstype) {
    case Formuleringstype.FOR_BARN_FØDT:
      return (
        <>
          <div>" "</div>
          <Mellomlinje> eller </Mellomlinje>
          <div>"for barn født [barnets fødselsdato]"</div>
          <Mellomlinje> eller </Mellomlinje>
          <div>"for barn født [barn1 fødselsdato, ..., og barnN fødselsdato]"</div>
        </>
      );
    case Formuleringstype.DU_ELLER_DU_OG_BARNA:
      return (
        <>
          <div>"du"</div>
          <Mellomlinje> eller </Mellomlinje>
          <div>"du og barnet"</div>
          <Mellomlinje> eller </Mellomlinje>
          <div>"du og barna"</div>
        </>
      );
    case Formuleringstype.BARNET_ELLER_BARNA:
      return 'Ikke laget enda';
  }
};

const Mellomlinje = styled.span`
  font-style: italic;
  margin-left: 1rem;
`;

const Overskrift = styled.div`
  font-weight: bold;
  margin-top: 1.5rem;
`;

const Hovedoverskrift = styled.div`
  font-weight: bold;
  font-size: 130%;
`;
