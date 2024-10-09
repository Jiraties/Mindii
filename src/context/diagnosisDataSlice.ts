import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  diagnosisDataType,
  screenType,
  symptom,
  diagnosisOption,
} from "../models/diagnosisTypes";

const initialState: diagnosisDataType = {
  screenIndex: 0,
  screenType: ["selectSymptom"],
  options: [],
  optionsSettings: { checklist: false, header: "", subheader: "" },
  symptomList: [],
  selectedOptionList: [],
};

const diagnosisDataSlice = createSlice({
  name: "diagnosisData",
  initialState,
  reducers: {
    nextScreen: (state, action: PayloadAction<screenType>) => {
      state.screenType.push(action.payload);
      state.screenIndex++;
    },
    addSymptom: (state, action: PayloadAction<symptom>) => {
      state.symptomList.push(action.payload);
    },
    setCustomOptions: (
      state,
      action: PayloadAction<{
        options: diagnosisOption[];
        header: string;
        subheader: string;
        checklist: boolean;
      }>
    ) => {
      const { options, header, subheader, checklist } = action.payload;
      state.options = options;
      state.optionsSettings = { checklist, header, subheader };
    },
    selectOption: (state, action: PayloadAction<diagnosisOption>) => {
      state.selectedOptionList.push(action.payload);
    },
    resetDiagnosis: (state) => {
      state.screenIndex = 0;
      state.screenType = ["selectSymptom"];
      state.options = [];
      state.optionsSettings = { checklist: false, header: "", subheader: "" };
      state.symptomList = [];
      state.selectedOptionList = [];
    },
    rewindSymptom: (state, action: PayloadAction<screenType>) => {
      switch (action.payload) {
        case "selectSymptom":
          state.symptomList.splice(-1);
        case "symptomLength":
          delete state.symptomList[state.symptomList.length - 1];
        case "customOptions":
          state.selectedOptionList.pop();
      }

      state.screenIndex -= 1;
      state.screenType.pop();
    },
  },
});

export const diagnosisDataActions = diagnosisDataSlice.actions;
export default diagnosisDataSlice;
