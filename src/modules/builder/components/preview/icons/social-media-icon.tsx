import { lazy } from 'react';

const iconsMap: Record<
  string,
  React.LazyExoticComponent<
    (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
  >
> = {
  facebook: lazy(() => import('./social-media/facebook-icon')),
  github: lazy(() => import('./social-media/github-icon')),
  instagram: lazy(() => import('./social-media/instagram-icon')),
  linkedin: lazy(() => import('./social-media/linkedin-icon')),
  telegram: lazy(() => import('./social-media/telegram-icon')),
  twitter: lazy(() => import('./social-media/twitter-icon')),
  website: lazy(() => import('./social-media/website-icon')),
  youtube: lazy(() => import('./social-media/youtube-icon')),
};

interface SocialMediaIconProps {
  socialMedia: string;
  className?: string;
}

export function SocialMediaIcon({
  socialMedia,
  className,
}: SocialMediaIconProps) {
  const Icon = iconsMap[socialMedia.toLowerCase()];

  if (!Icon) return null;

  return (
    <Icon
      className={className}
      data-testid={`social-media-icon.${socialMedia}`}
    />
  );
}
