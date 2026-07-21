import { ArrowLeftCircle } from 'lucide-react';
import { memo } from 'react';

import { useBuilderStore } from '#builder/stores/use-builder-store.ts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function FormToggle() {
  const isFormVisible = useBuilderStore((state) => state.isFormVisible);

  return (
    <Button
      aria-label="Form Open/Close"
      title={isFormVisible ? 'Hide Form' : 'Show Form'}
      size="icon"
      variant="ghost"
      className="fixed bottom-5 left-10 print:hidden"
      onClick={() => useBuilderStore.getState().toggleFormVisibility()}
    >
      <ArrowLeftCircle
        className={cn(
          'size-10 transition-transform duration-150',
          !isFormVisible && 'rotate-180',
        )}
      />
    </Button>
  );
}

export const BuilderFormToggle = memo(FormToggle);
