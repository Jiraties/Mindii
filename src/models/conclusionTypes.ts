export type flag = "visitDoctor";

export type conclusion = {
  diseaseName: string;
  flags?: flag[];
  imageUri: string;
  description: string;
  id: string;
};
