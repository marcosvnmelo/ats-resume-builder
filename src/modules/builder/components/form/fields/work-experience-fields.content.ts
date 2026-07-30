import { nest, t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'work-experience-fields',
  content: {
    fields: {
      company: {
        label: t({
          'en': 'Company',
          'pt-BR': 'Empresa',
        }),
        placeholder: t({
          'en': 'Torph TTC',
          'pt-BR': 'Torph TTC',
        }),
      },
      position: {
        label: t({
          'en': 'Job Title',
          'pt-BR': 'Cargo',
        }),
        placeholder: t({
          'en': 'Developer',
          'pt-BR': 'Desenvolvedor',
        }),
      },
      description: {
        label: t({
          'en': 'Description',
          'pt-BR': 'Descrição',
        }),
        placeholder: t({
          'en': 'Torph TTC is a global software company that offers user interface UI development tools and components for a range of developer applications across all platforms.',
          'pt-BR':
            'Torph TTC é uma empresa global de software que oferece ferramentas de desenvolvimento de interface de usuário e componentes para uma ampla gama de aplicativos de desenvolvedores em todas as plataformas.',
        }),
      },
      keyAchievements: {
        label: t({
          'en': 'Key Achievements',
          'pt-BR': 'Conquistas',
        }),
        placeholder: t({
          'en': "Created and maintained 10 web applications for numerous national and foreign clients.\nEnsured that the user interfaces and user experience of the software applications developed by the team met at least 80% of users expectations.\nCreated and analyzed 500 unit test cases.\nDeveloped python scripts to automate image's noise-reduction process which helped improve research analysis time by 40%.\nEstablished and lead a team of 10 people; covering every key role in the early stages.",
          'pt-BR':
            'Criou e manteve 10 aplicativos web para vários clientes nacionais e estrangeiros.\nEnsure que as interfaces de usuário e experiência do usuário dos aplicativos desenvolvidos pela equipe atendeu ao menos 80% das expectativas dos usuários.\nCriou e analisou 500 casos de teste unitário.\nDesenvolvido scripts python para automatizar o processo de redução de ruído da imagem, o que ajudou a melhorar o tempo de análise de pesquisa em 40%.\nEstabeleceu e lidera um time de 10 pessoas; cobrindo todas as funções-chave no início da etapa inicial.',
        }),
      },
      startYear: nest('shared-fields', 'fields.startYear'),
      endYear: nest('shared-fields', 'fields.endYear'),
      showOnBottom: nest('shared-fields', 'fields.showOnBottom'),
    },
  },
} satisfies Dictionary;

export default componentContent;
