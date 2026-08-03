import { it, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';

import { SocialMediaIcon } from '../social-media-icon';

describe('SocialMediaIcon', () => {
  it.for([
    'Facebook',
    'Github',
    'Instagram',
    'LinkedIn',
    'Telegram',
    'Twitter',
    'Website',
    'YouTube',
  ])('should render a %s icon', async (socialMedia) => {
    const { locator } = await render(
      <SocialMediaIcon socialMedia={socialMedia} />,
    );

    await expect
      .element(locator.getByTestId(`social-media-icon.${socialMedia}`))
      .toBeVisible();
  });
});
