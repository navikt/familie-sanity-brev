import { defineCliConfig } from 'sanity/cli';

export const PROSJEKT_ID = 'xsrv1mh6';

export default defineCliConfig({
  api: {
    projectId: PROSJEKT_ID,
  },
  deployment: {
    appId: 'a5127a088702861473521b94',
  },
});
