import { defineConfig, definePlugin } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/index';

const sharedConfig = definePlugin({
  name: 'shareConfig',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

export default defineConfig([
  {
    name: 'testdata',
    title: 'Test',
    projectId: 'xsrv1mh6',
    dataset: 'testdata',
    basePath: '/testdata',
    plugins: [deskTool()],
    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'ba-brev',
    title: 'BA',
    projectId: 'xsrv1mh6',
    dataset: 'ba-brev',
    basePath: '/ba-brev',
    plugins: [sharedConfig()],
  },
  {
    name: 'ba-test',
    title: 'BA-test',
    projectId: 'xsrv1mh6',
    dataset: 'ba-test',
    basePath: '/ba-test',
    plugins: [sharedConfig()],
  },
  {
    name: 'ks-brev',
    title: 'KS',
    projectId: 'xsrv1mh6',
    dataset: 'ks-brev',
    basePath: '/ks-brev',
    plugins: [sharedConfig()],
  },
  {
    name: 'ks-test',
    title: 'KS-test',
    projectId: 'xsrv1mh6',
    dataset: 'ks-test',
    basePath: '/ks-test',
    plugins: [sharedConfig()],
  },
  {
    name: 'ef-brev',
    title: 'EF',
    projectId: 'xsrv1mh6',
    dataset: 'ef-brev',
    basePath: '/ef-brev',
    plugins: [sharedConfig()],
  },
  {
    name: 'ef-test',
    title: 'EF-test',
    projectId: 'xsrv1mh6',
    dataset: 'ef-test',
    basePath: '/ef-test',
    plugins: [sharedConfig()],
  },
]);
