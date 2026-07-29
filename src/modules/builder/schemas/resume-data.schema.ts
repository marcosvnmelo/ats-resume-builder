import * as z from 'zod';

const personalInformationV0 = z.object({
  name: z.string(),
  position: z.string(),
  contactInformation: z.string(),
  email: z.email(),
  address: z.string(),
  profilePicture: z.string(),
});

const socialMediaItemV0 = z.object({ socialMedia: z.string(), link: z.string() });

const summaryV0 = z.string();

const educationItemV0 = z.object({
  school: z.string(),
  degree: z.string(),
  startYear: z.string(),
  endYear: z.string(),
});

const workExperienceItemV0 = z.object({
  company: z.string(),
  position: z.string(),
  description: z.string(),
  keyAchievements: z.string(),
  startYear: z.string(),
  endYear: z.string(),
});

const projectsItemV0 = z.object({
  name: z.string(),
  link: z.string(),
  description: z.string(),
  keyAchievements: z.string(),
  startYear: z.string(),
  endYear: z.string(),
});

const skillsItemV0 = z.string();

const skillSectionV0 = z.object({ title: z.string(), skills: z.array(skillsItemV0) });

const languagesItemV0 = z.string();

const certificationsItemV0 = z.string();

export const resumeDataSchemaV0 = personalInformationV0
  .extend({
    socialMedia: z.array(socialMediaItemV0),
    summary: summaryV0,
    education: z.array(educationItemV0),
    workExperience: z.array(workExperienceItemV0),
    projects: z.array(projectsItemV0),
    skills: z.tuple([skillSectionV0]),
    languages: z.array(languagesItemV0),
    certifications: z.array(certificationsItemV0),
  })
  .transform((data) => ({
    v: 1,
    personalInformation: {
      data: {
        name: data.name,
        position: data.position,
        phone: data.contactInformation,
        email: data.email,
        address: data.address,
        profilePicture: data.profilePicture,
      },
    },
    socialMedia: {
      items: data.socialMedia,
    },
    summary: {
      text: data.summary,
    },
    education: {
      items: data.education,
    },
    workExperience: {
      items: data.workExperience,
    },
    projects: {
      items: data.projects,
    },
    skills: {
      title: data.skills[0].title,
      items: data.skills[0].skills,
      // HACK: This is a workaround to satisfy the type checker
    } as { items: string[] },
    languages: {
      items: data.languages,
    },
    certifications: {
      items: data.certifications,
    },
  }));

export const resumeDataSchemaV1 = z.object({
  v: z.literal(1),
  personalInformation: z.object({
    title: z.string().default('Personal Information'),
    data: personalInformationV0.omit({ contactInformation: true }).extend({
      phone: personalInformationV0.shape.contactInformation,
    }),
  }),
  socialMedia: z.object({
    title: z.string().default('Social Medias'),
    items: z.array(socialMediaItemV0),
  }),
  summary: z.object({
    title: z.string().default('Summary'),
    text: summaryV0,
  }),
  education: z.object({
    title: z.string().default('Education'),
    items: z.array(educationItemV0),
  }),
  workExperience: z.object({
    title: z.string().default('Work Experience'),
    items: z.array(
      workExperienceItemV0.extend({
        showOnBottom: z.boolean().default(false),
      }),
    ),
  }),
  projects: z.object({
    title: z.string().default('Projects'),
    items: z.array(projectsItemV0),
    showOnBottom: z.boolean().default(false),
  }),
  skills: z.object({
    title: skillSectionV0.shape.title.default('Technical Skills'),
    items: skillSectionV0.shape.skills,
  }),
  languages: z.object({
    title: z.string().default('Languages'),
    items: z.array(languagesItemV0),
    showOnBottom: z.boolean().default(false),
  }),
  certifications: z.object({
    title: z.string().default('Tests & Certifications'),
    items: z.array(certificationsItemV0),
    showOnBottom: z.boolean().default(false),
  }),
});

export const resumeDataSchema = z
  .union([resumeDataSchemaV0, resumeDataSchemaV1])
  .pipe(resumeDataSchemaV1);

export type ResumeData = z.infer<typeof resumeDataSchema>;
