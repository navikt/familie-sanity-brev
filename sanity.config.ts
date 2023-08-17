import { AuthConfig, defineConfig, definePlugin } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src';
import { structure } from './config/deskStructure';

const PROSJEKT_ID = 'xsrv1mh6';

const sharedConfig = definePlugin({
  name: 'shareConfig',
  plugins: [deskTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

const auth: AuthConfig = {
  redirectOnSingle: true,
  providers: () => [
    {
      name: 'saml',
      title: 'NAV SSO',
      url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37',
      logo: '/static/navlogo.svg',
    },
  ],
  loginMethod: 'dual',
};

export default defineConfig([
  {
    name: 'testdata',
    title: 'Test',
    projectId: PROSJEKT_ID,
    dataset: 'testdata',
    basePath: '/testdata',
    plugins: [sharedConfig()],
    auth: auth,
  },
  {
    name: 'ba-brev',
    title: 'BA',
    projectId: PROSJEKT_ID,
    dataset: 'ba-brev',
    basePath: '/ba-brev',
    plugins: [sharedConfig()],
    auth: auth,
  },
  {
    name: 'ba-test',
    title: 'BA-test',
    projectId: PROSJEKT_ID,
    dataset: 'ba-test',
    basePath: '/ba-test',
    plugins: [sharedConfig()],
    auth: auth,
  },
  {
    name: 'ks-brev',
    title: 'KS',
    projectId: PROSJEKT_ID,
    dataset: 'ks-brev',
    basePath: '/ks-brev',
    plugins: [sharedConfig()],
    auth: auth,
  },
  {
    name: 'ks-test',
    title: 'KS-test',
    projectId: PROSJEKT_ID,
    dataset: 'ks-test',
    basePath: '/ks-test',
    plugins: [sharedConfig()],
    auth: auth,
  },
  {
    name: 'ef-brev',
    title: 'EF',
    projectId: PROSJEKT_ID,
    dataset: 'ef-brev',
    basePath: '/ef-brev',
    plugins: [sharedConfig()],
    auth: auth,
  },
  {
    name: 'ef-test',
    title: 'EF-test',
    projectId: PROSJEKT_ID,
    dataset: 'ef-test',
    basePath: '/ef-test',
    plugins: [sharedConfig()],
    auth: auth,
  },
]);
