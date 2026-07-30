import { t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'personal-information-section',
  content: {
    title: t({
      'en': 'Personal Information',
      'pt-BR': 'Informações Pessoais',
    }),
    fields: {
      name: {
        label: t({
          'en': 'Full Name',
          'pt-BR': 'Nome Completo',
        }),
        placeholder: t({
          'en': 'MARCUS HALL',
          'pt-BR': 'MARCUS HALL',
        }),
      },
      position: {
        label: t({
          'en': 'Job Title',
          'pt-BR': 'Cargo',
        }),
        placeholder: t({
          'en': 'Fullstack Developer',
          'pt-BR': 'Desenvolvedor Fullstack',
        }),
      },
      phone: {
        label: t({
          'en': 'Phone',
          'pt-BR': 'Telefone',
        }),
        placeholder: t({
          'en': '+1-555-0100',
          'pt-BR': '+55 (00) 91234-5678',
        }),
      },
      email: {
        label: t({
          'en': 'Email',
          'pt-BR': 'Email',
        }),
        placeholder: t({
          'en': 'beddylea@gmail.com',
          'pt-BR': 'beddylea@gmail.com',
        }),
      },
      address: {
        label: t({
          'en': 'Address',
          'pt-BR': 'Endereço',
        }),
        placeholder: t({
          'en': 'San Francisco, CA',
          'pt-BR': 'São Paulo, SP',
        }),
      },
      profilePicture: {
        label: t({
          'en': 'Profile Picture',
          'pt-BR': 'Foto de Perfil',
        }),
      },
    },
  },
} satisfies Dictionary;

export default componentContent;
