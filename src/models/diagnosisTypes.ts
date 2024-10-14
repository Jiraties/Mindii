export type screenType = "selectSymptom" | "symptomLength" | "customOptions";

export type symptom = {
  id: string;
  name: string;
  emoji: string;
  description: string;
};

export type diagnosisOption = {
  question: string;
  value: string;
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
  symptomList: symptom[];
  selectedOptionList: diagnosisOption[];
}

export interface symptomLength {
  value: string;
  name: string;
}
