import * as z from 'zod';

export const resumeDataSchemaV0 = z
  .object({
    name: z.string(),
    position: z.string(),
    contactInformation: z.string(),
    email: z.email(),
    address: z.string(),
    profilePicture: z.string(),
    socialMedia: z.array(z.object({ socialMedia: z.string(), link: z.string() })),
    summary: z.string(),
    education: z.array(
      z.object({
        school: z.string(),
        degree: z.string(),
        startYear: z.string(),
        endYear: z.string(),
      }),
    ),
    workExperience: z.array(
      z.object({
        company: z.string(),
        position: z.string(),
        description: z.string(),
        keyAchievements: z.string(),
        startYear: z.string(),
        endYear: z.string(),
      }),
    ),
    projects: z.array(
      z.object({
        name: z.string(),
        link: z.string(),
        description: z.string(),
        keyAchievements: z.string(),
        startYear: z.string(),
        endYear: z.string(),
      }),
    ),
    skills: z.tuple([z.object({ title: z.string(), skills: z.array(z.string()) })]),
    languages: z.array(z.string()),
    certifications: z.array(z.string()),
  })
  .transform((data) => ({
    v: 1,
    personalInformation: {
      data: {
        name: data.name,
        position: data.position,
        contactInformation: data.contactInformation,
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
    data: resumeDataSchemaV0.def.in.pick({
      name: true,
      position: true,
      contactInformation: true,
      email: true,
      address: true,
      profilePicture: true,
    }),
  }),
  socialMedia: z.object({
    title: z.string().default('Social Media'),
    items: resumeDataSchemaV0.def.in.shape.socialMedia,
  }),
  summary: z.object({
    title: z.string().default('Summary'),
    text: resumeDataSchemaV0.def.in.shape.summary,
  }),
  education: z.object({
    title: z.string().default('Education'),
    items: resumeDataSchemaV0.def.in.shape.education,
  }),
  workExperience: z.object({
    title: z.string().default('Work Experience'),
    items: resumeDataSchemaV0.def.in.shape.workExperience,
  }),
  projects: z.object({
    title: z.string().default('Projects'),
    items: resumeDataSchemaV0.def.in.shape.projects,
  }),
  skills: z.object({
    title:
      resumeDataSchemaV0.def.in.shape.skills.def.items[0].shape.title.default('Technical Skills'),
    items: resumeDataSchemaV0.def.in.shape.skills.def.items[0].shape.skills,
  }),
  languages: z.object({
    title: z.string().default('Languages'),
    items: resumeDataSchemaV0.def.in.shape.languages,
  }),
  certifications: z.object({
    title: z.string().default('Tests & Certifications'),
    items: resumeDataSchemaV0.def.in.shape.certifications,
  }),
});

export const resumeDataSchema = z
  .union([resumeDataSchemaV0, resumeDataSchemaV1])
  .pipe(resumeDataSchemaV1);

export type ResumeData = z.infer<typeof resumeDataSchema>;
