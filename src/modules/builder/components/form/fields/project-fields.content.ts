import { nest, t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'project-fields',
  content: {
    fields: {
      name: {
        label: t({
          'en': 'Project Name',
          'pt-BR': 'Nome do Projeto',
        }),
        placeholder: t({
          'en': 'ATS Resume Builder',
          'pt-BR': 'ATS Resume Builder',
        }),
      },
      link: {
        label: t({
          'en': 'Link',
          'pt-BR': 'Link',
        }),
        placeholder: t({
          'en': 'https://github.com/marcosvnmelo/ats-resume-builder',
          'pt-BR': 'https://github.com/marcosvnmelo/ats-resume-builder',
        }),
      },
      description: {
        label: t({
          'en': 'Description',
          'pt-BR': 'Descrição',
        }),
        placeholder: t({
          'en': 'ATS Resume Builder is a web application that allows users to create and manage their resumes.',
          'pt-BR':
            'ATS Resume Builder é uma aplicação web que permite que os usuários criem e gerenciem seus currículos.',
        }),
      },
      keyAchievements: {
        label: t({
          'en': 'Key Achievements',
          'pt-BR': 'Conquistas',
        }),
        placeholder: t({
          'en': 'Allow users to create and manage their resumes.\nAllow users to import and export their resumes.',
          'pt-BR':
            'Permite que os usuários criem e gerenciem seus currículos.\nPermite que os usuários importem e exportem seus currículos.',
        }),
      },
      startYear: nest('shared-fields', 'fields.startYear'),
      endYear: nest('shared-fields', 'fields.endYear'),
    },
  },
} satisfies Dictionary;

export default componentContent;
