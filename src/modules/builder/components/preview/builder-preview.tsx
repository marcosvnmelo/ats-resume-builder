import { Header } from './header/header';

export function BuilderPreview() {
  return (
    <div className="overflow-y-visible p-6 md:col-span-6 md:h-screen md:overflow-y-scroll print:p-0">
      <div className="a4">
        <Header />
      </div>
    </div>
  );
}
