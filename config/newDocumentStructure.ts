import S from '@sanity/base/structure-builder';
import { ekskluderesForEf, erEf } from './felles';

export default [
  ...S.defaultInitialValueTemplateItems().filter(
    builder => !erEf() || !ekskluderesForEf.includes(builder.getId()),
  ),
];
