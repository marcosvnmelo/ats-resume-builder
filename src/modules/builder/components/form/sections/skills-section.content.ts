import { t, type Dictionary } from 'intlayer';

import type { SkillType } from '#builder/schemas/resume-data.schema.ts';

const componentContent = {
  key: 'skills-section',
  content: {
    technical: {
      title: t({
        'en': 'Technical Skills',
        'pt-BR': 'Habilidades Técnicas',
      }),
      placeholder: t({
        'en': 'HTML',
        'pt-BR': 'HTML',
      }),
    },
    soft: {
      title: t({
        'en': 'Soft Skills',
        'pt-BR': 'Habilidades Sociais',
      }),
      placeholder: t({
        'en': 'Collaboration',
        'pt-BR': 'Colaboração',
      }),
    },
    additional: {
      title: t({
        'en': 'Additional Skills',
        'pt-BR': 'Habilidades Adicionais',
      }),
      placeholder: t({
        'en': 'Public Speaking',
        'pt-BR': 'Falar em Público',
      }),
    },
  } satisfies Record<SkillType, unknown>,
} satisfies Dictionary;

export default componentContent;
