import { t, type Dictionary, nest } from 'intlayer';

const componentContent = {
  key: 'education-fields',
  content: {
    fields: {
      degree: {
        label: t({
          'en': 'Degree',
          'pt-BR': 'Curso',
        }),
        placeholder: t({
          'en': 'Bachelor of Computer Science',
          'pt-BR': 'Bacharel em Ciência da Computação',
        }),
      },
      school: {
        label: t({
          'en': 'Institution',
          'pt-BR': 'Instituição',
        }),
        placeholder: t({
          'en': 'New York University',
          'pt-BR': 'Universidade de São Paulo',
        }),
      },
      startYear: nest('shared-fields', 'fields.startYear'),
      endYear: nest('shared-fields', 'fields.endYear'),
    },
  },
} satisfies Dictionary;

export default componentContent;
