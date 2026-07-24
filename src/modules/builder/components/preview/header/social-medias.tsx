import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SocialMediaIcon } from '../icons/social-media-icon';

export function SocialMedias() {
  const socialMedias = useBuilderPreviewStore(
    (state) => state.resumeData.socialMedia.items,
  );

  return (
    <div className="grid grid-cols-3 gap-1">
      {socialMedias.map((socialMedia, index) => {
        return (
          <a
            key={socialMedia.socialMedia + index}
            href={socialMedia.link.replace(/^(https?:\/\/)?(.+)/, 'https://$2')}
            target="_blank"
            aria-label={socialMedia.socialMedia}
            title={socialMedia.socialMedia}
            rel="noreferrer"
            className="align-center inline-flex items-center justify-center gap-1 text-xs font-normal"
          >
            <SocialMediaIcon
              socialMedia={socialMedia.socialMedia}
              className="size-3"
            />
            {socialMedia.link}
          </a>
        );
      })}
    </div>
  );
}
