import { t, type Dictionary } from 'intlayer';

import sharedContent from '../fields/shared.content.ts';

const componentContent = {
  key: 'languages-section',
  content: {
    title: t({
      'en': 'Languages',
      'pt-BR': 'Idiomas',
    }),
    showOnBottom: sharedContent.content.fields.showOnBottom,
  },
} satisfies Dictionary;

export default componentContent;
