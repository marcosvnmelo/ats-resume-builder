import { t, type Dictionary } from 'intlayer';

import sharedContent from '../fields/shared.content.ts';

const componentContent = {
  key: 'certifications-section',
  content: {
    title: t({
      'en': 'Tests & Certifications',
      'pt-BR': 'Testes e Certificações',
    }),
    defaultValue: t({
      'en': 'Certifications',
      'pt-BR': 'Certificações',
    }),
    showOnBottom: sharedContent.content.fields.showOnBottom,
  },
} satisfies Dictionary;

export default componentContent;
