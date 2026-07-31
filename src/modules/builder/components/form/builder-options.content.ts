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
      dateRangeMonthFormat: {
        label: t({
          'en': 'Dates month format',
          'pt-BR': 'Formato do mês nas datas',
        }),
        options: {
          'short': t({
            'en': 'Short',
            'pt-BR': 'Curto',
          }),
          '2-digit': t({
            'en': '2 digit',
            'pt-BR': '2 dígitos',
          }),
        },
      },
    },
  },
} satisfies Dictionary;

export default componentContent;
