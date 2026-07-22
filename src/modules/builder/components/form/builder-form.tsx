import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderForm } from '#builder/hooks/use-builder-form.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, FieldSeparator } from '@/components/ui/field';
import { ScrollArea } from '@/components/ui/scroll-area';

import { EducationSection } from './sections/education-section';
import { ImportExportSection } from './sections/import-export-section';
import { LanguagesSection } from './sections/languages-section';
import { PersonalInformationSection } from './sections/personal-information-section';
import { ProjectsSection } from './sections/projects-section';
import { SkillsSection } from './sections/skills-section';
import { SocialMediaSection } from './sections/social-media-section-array';
import { SummarySection } from './sections/summary-section';
import { WorkExperienceSection } from './sections/work-experience-section';

export function BuilderForm() {
  const form = useBuilderForm({
    ...builderFormOptions,
    onSubmit({ value }) {
      console.log('Submitted', value);
    },
  });

  return (
    <ScrollArea className="dark md:col-span-4 md:h-screen print:hidden">
      <Card className="min-h-full rounded-none">
        <CardHeader>
          <CardTitle>ATS Resume Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppForm>
              <FieldGroup>
                <ImportExportSection form={form} fields="import" />
                <FieldSeparator />
                <PersonalInformationSection
                  form={form}
                  fields="personalInformation"
                />
                <FieldSeparator />
                <SocialMediaSection form={form} fields="socialMedia" />
                <FieldSeparator />
                <SummarySection form={form} fields="summary" />
                <FieldSeparator />
                <EducationSection form={form} fields="education" />
                <FieldSeparator />
                <WorkExperienceSection form={form} fields="workExperience" />
                <FieldSeparator />
                <ProjectsSection form={form} fields="projects" />
                <FieldSeparator />
                <SkillsSection form={form} fields="skills" />
                <FieldSeparator />
                <LanguagesSection form={form} fields="languages" />
              </FieldGroup>
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
