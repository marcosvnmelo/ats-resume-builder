import { CertificationsSection } from '../shared/sections/certifications-section';
import { LanguagesSection } from '../shared/sections/languages-section';

export function BottomSide() {
  return (
    <div className="col-span-3 space-y-2">
      <LanguagesSection showOnBottom={true} />

      <CertificationsSection showOnBottom={true} />
    </div>
  );
}
