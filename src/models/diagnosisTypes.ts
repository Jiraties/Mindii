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
};

export interface diagnosisDataType {
  screenIndex: number;
  screenType: screenType[];
  options: diagnosisOption[];
  symptomList: symptom[];
  selectedOptionList: diagnosisOption[];
}
