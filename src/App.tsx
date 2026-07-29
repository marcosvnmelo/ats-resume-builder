// oxlint-disable react/only-export-components
import { IntlayerProvider } from 'react-intlayer';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Builder } from '@/modules/builder/components/builder';

import { useI18nHTMLAttributes } from './hooks/use-i18n-html-attributes';
import { withProviders } from './lib/with-providers';

function App() {
  useI18nHTMLAttributes();

  return <Builder />;
}

export default withProviders(App)(IntlayerProvider, TooltipProvider);
