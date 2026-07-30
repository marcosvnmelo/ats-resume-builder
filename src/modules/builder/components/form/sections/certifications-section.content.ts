import { nest, t, type Dictionary } from 'intlayer';

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
    showOnBottom: nest('shared-fields', 'fields.showOnBottom'),
  },
} satisfies Dictionary;

export default componentContent;
