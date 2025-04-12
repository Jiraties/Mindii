export type screenType =
  | "selectSymptom"
  | "symptomLength"
  | "customOptions"
  | "diagnosisIntro";

export type symptom = {
  id: string;
  name: string;
  emoji: string;
  description: string;
};

export type diagnosisOption = {
  question: string;
  value: number;
  name: string;
  isChecked?: boolean;
};

export interface optionsSettings {
  checklist?: boolean;
  header: string;
  subheader?: string;
}

export interface diagnosisDataType {
  screenIndex: number;
  screenType: screenType[];
  options: diagnosisOption[];
  optionsSettings: optionsSettings;
  latestQuestion: string;
  scoring: {
    somatic: number;
    anxietyAndInsomnia: number;
    socialDysfunction: number;
    severeDepression: number;
  };
}

export interface symptomLength {
  value: string;
  name: string;
}
