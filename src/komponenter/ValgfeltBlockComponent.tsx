import styled from 'styled-components';
import * as React from 'react';
import { useSanityQuery } from '../util/sanity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BlockContent = require('@sanity/block-content-to-react');

const ValgfeltBlockComponent = (props: any) => {
  console.log('PROPS', props);
  return <h1>TestValgfelt</h1>;
};

export default ValgfeltBlockComponent;
