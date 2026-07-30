import { t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'builder-options',
  content: {
    fields: {
      locale: {
        label: t({
          'en': 'Language',
          'pt-BR': 'Idioma',
        }),
        options: {
          'en': t({
            'en': 'English',
            'pt-BR': 'Inglês',
          }),
          'pt-BR': t({
            'en': 'Portuguese (Brazil)',
            'pt-BR': 'Português (Brasil)',
          }),
        },
      },
    },
  },
} satisfies Dictionary;

export default componentContent;
