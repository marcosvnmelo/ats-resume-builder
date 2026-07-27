import { cn } from '@/lib/utils';

import { Header } from './header/header';
import { LeftSide } from './left-side/left-side';
import { RightSide } from './right-side/right-side';

export function BuilderPreview() {
  return (
    <div
      className={cn(
        'light bg-background text-foreground',
        'p-6 print:p-0',
        'overflow-y-visible md:overflow-y-scroll',
        'max-w-3xl flex-1 md:mx-auto md:h-screen',
      )}
    >
      <Header />
      <hr className="my-2 border-dashed" />
      <div className="grid grid-cols-3 gap-6">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}
