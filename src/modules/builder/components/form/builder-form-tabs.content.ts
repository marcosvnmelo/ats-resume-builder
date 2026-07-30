import { t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'builder-form-tabs',
  content: {
    tabs: {
      builder: t({
        'en': 'Builder',
        'pt-BR': 'Construtor',
      }),
      options: t({
        'en': 'Options',
        'pt-BR': 'Opções',
      }),
    },
  },
} satisfies Dictionary;

export default componentContent;
