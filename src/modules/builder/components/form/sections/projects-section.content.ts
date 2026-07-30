import { nest, t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'projects-section',
  content: {
    title: t({
      'en': 'Projects',
      'pt-BR': 'Projetos',
    }),
    showOnBottom: nest('shared-fields', 'fields.showOnBottom'),
  },
} satisfies Dictionary;

export default componentContent;
