import { nest, t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'languages-section',
  content: {
    title: t({
      'en': 'Languages',
      'pt-BR': 'Idiomas',
    }),
    showOnBottom: nest('shared-fields', 'fields.showOnBottom'),
  },
} satisfies Dictionary;

export default componentContent;
