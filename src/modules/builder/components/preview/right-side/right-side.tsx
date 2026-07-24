import { ProjectsSection } from './projects-section';
import { WorkExperienceSection } from './work-experience-section';

export function RightSide() {
  return (
    <div className="col-span-2 space-y-2">
      <WorkExperienceSection />
      <ProjectsSection />
    </div>
  );
}
