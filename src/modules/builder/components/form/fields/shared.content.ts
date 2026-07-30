import { t, type Dictionary } from 'intlayer';

const sharedContent = {
  key: 'shared-fields',
  content: {
    fields: {
      startYear: {
        label: t({
          'en': 'Start Year',
          'pt-BR': 'Ano de Início',
        }),
      },
      endYear: {
        label: t({
          'en': 'End Year',
          'pt-BR': 'Ano de Término',
        }),
      },
      showOnBottom: {
        label: t({
          'en': 'Show on bottom',
          'pt-BR': 'Mostrar no final',
        }),
      },
    },
  },
} satisfies Dictionary;

export default sharedContent;
