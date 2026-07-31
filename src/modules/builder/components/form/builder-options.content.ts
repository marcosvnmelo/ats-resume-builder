import { t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'builder-options',
  content: {
    fields: {
      resumeTitleTemplate: {
        label: t({
          'en': 'Resume title',
          'pt-BR': 'Título do currículo',
        }),
        defaultValue: t({
          'en': '{{user_name}}-Resume-by-{{project_url}}',
          'pt-BR': '{{user_name}}-Curriculo-por-{{project_url}}',
        }),
        description: t({
          'en': "The resume's tile that will be used on the pdf file. You can use the following variables: {{user_name}} and {{project_url}}.",
          'pt-BR':
            'O título do currículo que será usado no arquivo pdf. Você pode usar as seguintes variáveis: {{user_name}} e {{project_url}}.',
        }),
      },
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
