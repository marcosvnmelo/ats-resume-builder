import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SocialMediaIcon } from '../icons/social-media-icon';
import { ExternalLink } from '../shared/external-link';

export function SocialMedias() {
  const socialMedias = useBuilderPreviewStore(
    (state) => state.resumeData.socialMedia.items,
  );

  return (
    <div className="grid grid-cols-3 gap-1">
      {socialMedias.map((socialMedia, index) => {
        return (
          <ExternalLink
            key={socialMedia.socialMedia + index}
            href={socialMedia.link}
            aria-label={socialMedia.socialMedia}
            title={socialMedia.socialMedia}
            className="align-center inline-flex items-center justify-center gap-1 text-xs font-normal"
          >
            <SocialMediaIcon
              socialMedia={socialMedia.socialMedia}
              className="size-3"
            />
            {socialMedia.link}
          </ExternalLink>
        );
      })}
    </div>
  );
}
