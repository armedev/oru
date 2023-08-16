export type ConnectionDataSchema = {
  key: string;
  name: string;
  about: string;
  email: string;
};
export type ExperienceDataSchema = {
  title: string;
  pictureUrl: string;
  type: string;
  company: string;
  startDate: string;
  endDate: string;
};
export type EducationDataSchema = {
  university: string;
  course: string;
  desc: string;
  startDate: string;
  endDate: string;
};
export type CertificationDataSchema = {
  title: string;
  pictureUrl: string;
  about: string;
};
export type UserDataSchema = {
  email: string;
  hashedPass: string;

  pictureUrl: string;

  name: string | null;
  phoneNo: string | null;
  about: string | null;
  skills: Array<string>;
  certifications: Array<CertificationDataSchema>;
  experiences: Array<ExperienceDataSchema>;
  educations: Array<EducationDataSchema>;
};
