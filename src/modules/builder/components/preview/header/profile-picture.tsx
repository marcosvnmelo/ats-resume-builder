import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

export function ProfilePicture() {
  const profilePicture = useBuilderPreviewStore(
    (state) => state.resumeData.personalInformation.data.profilePicture,
  );

  const hasProfilePicture = profilePicture.length > 0;

  if (!hasProfilePicture) return null;

  return (
    <div className="border-border h-24 w-24 overflow-hidden rounded-full border-2">
      <img
        src={profilePicture}
        alt="profile"
        width={100}
        height={100}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
