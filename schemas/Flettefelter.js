import React from 'react';
import { Link } from 'part:@sanity/base/router';

export default {
  name: 'flettefelter',
  type: 'document',
  title: 'Flettefelter',
  fields: [
    { name: 'navn', type: 'string', title: 'Navn', required: true },
    {
      name: 'felter',
      type: 'array',
      title: 'Felter',
      description: (
        <span>
          Feltene må først defineres <Link href={'/desk/flettefelt'}>her</Link>
        </span>
      ),
      of: [
        {
          name: 'flettefelt',
          type: 'reference',
          to: {
            type: 'flettefelt',
          },
        },
      ],
    },
  ],
};
