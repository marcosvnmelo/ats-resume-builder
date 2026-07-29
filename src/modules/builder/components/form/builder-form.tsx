
import { useBuilderForm } from '#builder/hooks/use-builder-form.ts';

import { CertificationsSection } from './sections/certifications-section';
import { EducationSection } from './sections/education-section';
import { ImportExportSection } from './sections/import-export-section';
import { LanguagesSection } from './sections/languages-section';
import { PersonalInformationSection } from './sections/personal-information-section';
import { ProjectsSection } from './sections/projects-section';
import { SkillsSection } from './sections/skills-section';
import { SocialMediaSection } from './sections/social-media-section-array';
import { SummarySection } from './sections/summary-section';
import { WorkExperienceSection } from './sections/work-experience-section';
import { SeparatedSections } from './separated-sections';

export function BuilderForm() {
  const form = useBuilderForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <SeparatedSections>
          <ImportExportSection form={form} fields="import" />

          <PersonalInformationSection
            form={form}
            fields="personalInformation"
          />

          <SocialMediaSection form={form} fields="socialMedia" />

          <SummarySection form={form} fields="summary" />

          <EducationSection form={form} fields="education" />

          <WorkExperienceSection form={form} fields="workExperience" />

          <ProjectsSection form={form} fields="projects" />

          <SkillsSection form={form} fields="skills" />

          <LanguagesSection form={form} fields="languages" />

          <CertificationsSection form={form} fields="certifications" />
        </SeparatedSections>
      </form.AppForm>
    </form>
  );
}
