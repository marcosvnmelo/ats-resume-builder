import { CardTitle } from '@/components/ui/card';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { BuilderPrintButton } from './builder-print-button';
import { BuilderForm } from './form/builder-form';
import { BuilderPreview } from './preview/builder-preview';

export function Builder() {
  return (
    <SidebarProvider className="font-inter [--card-spacing:--spacing(6)] **:[--sidebar-width:28rem]">
      <Sidebar
        className="print:hidden"
        mobileClassName={cn('font-inter [--card-spacing:--spacing(6)]')}
      >
        <SidebarHeader className="items-center">
          <CardTitle>ATS Resume Builder</CardTitle>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="p-(--card-spacing)">
            <BuilderForm />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>

      <SidebarInset className="md:flex-row">
        <SidebarTrigger className="print:hidden" />
        <BuilderPreview />
        <BuilderPrintButton />
      </SidebarInset>
    </SidebarProvider>
  );
}
