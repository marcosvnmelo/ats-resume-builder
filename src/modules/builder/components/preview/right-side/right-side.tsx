import { ProjectsSection } from '../shared/sections/projects-section';
import { WorkExperienceSection } from '../shared/sections/work-experience-section';

export function RightSide() {
  return (
    <div className="col-span-2 space-y-2">
      <WorkExperienceSection />
      <ProjectsSection />
    </div>
  );
}
