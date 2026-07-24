import { ContactInfo } from './contact-info';
import { NameAndPosition } from './name-and-position';
import { ProfilePicture } from './profile-picture';
import { SocialMedias } from './social-medias';

export function Header() {
  return (
    <div className="mb-1 flex flex-col items-center">
      <ProfilePicture />

      <NameAndPosition />

      <ContactInfo />

      <SocialMedias />
    </div>
  );
}
