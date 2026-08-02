import { it, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { locators, type Locator } from 'vitest/browser';

import { SocialMediaIcon } from '../social-media-icon';

declare module 'vitest/browser' {
  interface LocatorSelectors {
    getByTag(tag: string): Locator;
  }
}

locators.extend({
  getByTag(tag: string) {
    return `${tag}`;
  },
});

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

    await expect.element(locator.getByTag('svg')).toBeVisible();
  });
});
