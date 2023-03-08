import { uuid } from '@sanity/uuid';
import { FritekstområdePreview } from '../../komponenter/FritekstområdePreview';

export const Fritekstområde = {
  title: 'Fritekstområde',
  name: 'fritekstområde',
  type: 'object',
  fields: [
    { name: 'dummyfelt', type: 'string', initialValue: 'dummyverdi', readOnly: true, hidden: true }, // Brukes ikke til noen ting. Lagt til fordi sanity krever minst et felt
  ],
  preview: {
    component: FritekstområdePreview,
  },
};
