import { t, type Dictionary } from 'intlayer';

import sharedContent from '../fields/shared.content.ts';

const componentContent = {
  key: 'projects-section',
  content: {
    title: t({
      'en': 'Projects',
      'pt-BR': 'Projetos',
    }),
    showOnBottom: sharedContent.content.fields.showOnBottom,
  },
} satisfies Dictionary;

export default componentContent;
