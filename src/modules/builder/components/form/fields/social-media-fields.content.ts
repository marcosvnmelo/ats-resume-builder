import { t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'social-media-fields',
  content: {
    fields: {
      socialMedia: {
        label: t({
          'en': 'Social Media',
          'pt-BR': 'Rede Social',
        }),
        placeholder: t({
          'en': 'LinkedIn',
          'pt-BR': 'LinkedIn',
        }),
      },
      link: {
        label: t({
          'en': 'Link',
          'pt-BR': 'Link',
        }),
        placeholder: t({
          'en': 'https://linkedin.com/in/username',
          'pt-BR': 'https://linkedin.com/in/username',
        }),
      },
    },
  },
} satisfies Dictionary;

export default componentContent;
