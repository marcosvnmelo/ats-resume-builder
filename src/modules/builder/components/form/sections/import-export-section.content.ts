import { t, type Dictionary } from 'intlayer';

const componentContent = {
  key: 'import-export-section',
  content: {
    import: t({
      'en': 'Import',
      'pt-BR': 'Importar',
    }),
    export: t({
      'en': 'Export',
      'pt-BR': 'Exportar',
    }),
  },
} satisfies Dictionary;

export default componentContent;
