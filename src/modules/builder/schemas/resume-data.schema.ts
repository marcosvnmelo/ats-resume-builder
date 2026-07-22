import * as z from 'zod';

export const resumeDataSchema = z.object({
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
      description: z.string(),
      keyAchievements: z.string(),
      startYear: z.string(),
      endYear: z.string(),
    }),
  ),
  skills: z.tuple([z.object({ title: z.string(), skills: z.array(z.string()) })]),
  languages: z.array(z.string()),
  certifications: z.array(z.string()),
});
