import { Header } from './header/header';
import { LeftSide } from './left-side/left-side';
import { RightSide } from './right-side/right-side';

export function BuilderPreview() {
  return (
    <div className="overflow-y-visible p-6 md:col-span-6 md:h-screen md:overflow-y-scroll print:p-0">
      <div className="a4">
        <Header />
        <hr className="my-2 border-dashed" />
        <div className="grid grid-cols-3 gap-6">
          <LeftSide />
          <RightSide />
        </div>
      </div>
    </div>
  );
}
