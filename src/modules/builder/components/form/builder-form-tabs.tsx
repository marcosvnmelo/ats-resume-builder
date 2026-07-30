import { useIntlayer } from 'react-intlayer';

import { useBuilderStore } from '#builder/stores/use-builder-store.ts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function BuilderFormTabs(props: React.PropsWithChildren) {
  const sidebarView = useBuilderStore((state) => state.sidebarView);

  type SidebarView = typeof sidebarView;

  const t = useIntlayer('builder-form-tabs');

  return (
    <Tabs
      defaultValue="overview"
      value={sidebarView}
      onValueChange={(value) =>
        useBuilderStore.getState().changeSidebarView(value)
      }
    >
      <TabsList variant="line">
        <TabsTrigger value={'builder' satisfies SidebarView}>
          {t.tabs.builder}
        </TabsTrigger>
        <TabsTrigger value={'options' satisfies SidebarView}>
          {t.tabs.options}
        </TabsTrigger>
      </TabsList>

      {props.children}
    </Tabs>
  );
}
