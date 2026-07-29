import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';
import { cn } from '@/lib/utils';

const linkClassName = cn('inline-flex items-center gap-1');

export function ContactInfo() {
  const phone = useBuilderPreviewStore(
    (state) => state.resumeData.personalInformation.data.phone,
  );

  const email = useBuilderPreviewStore(
    (state) => state.resumeData.personalInformation.data.email,
  );

  const address = useBuilderPreviewStore(
    (state) => state.resumeData.personalInformation.data.address,
  );

  const hasPhone = phone.length > 0;
  const hasEmail = email.length > 0;
  const hasAddress = address.length > 0;

  if (!hasPhone && !hasEmail && !hasAddress) return null;

  return (
    <div className="mb-1 flex flex-row gap-1 text-sm font-normal">
      {hasPhone && (
        <a
          href={`tel:${phone}`}
          target="_blank"
          className={linkClassName}
          aria-label="Phone Number"
        >
          <PhoneIcon className="size-3" /> {phone}
        </a>
      )}
      {hasEmail && (
        <a
          href={`mailto:${email}`}
          className={linkClassName}
          target="_blank"
          aria-label="Email Address"
        >
          <MailIcon className="size-3" /> {email}
        </a>
      )}
      {hasAddress && (
        <address
          aria-label="Address"
          className={cn(linkClassName, 'not-italic')}
        >
          <MapPinIcon className="size-3" /> {address}
        </address>
      )}
    </div>
  );
}
