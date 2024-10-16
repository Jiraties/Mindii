import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { conclusion } from "../models/conclusionTypes";
import { diagnosisDataType } from "../models/diagnosisTypes";

interface displayConclusion {
  diseaseId: string;
  diagnosisData: diagnosisDataType;
  date: string;
}

interface ConclusionState {
  displayConclusion: displayConclusion;
  conclusionHistory: displayConclusion[];
}

const initialState: ConclusionState = {
  displayConclusion: {
    diseaseId: "malaria",
    date: "",
    diagnosisData: {
      screenIndex: 0,
      screenType: [],
      options: [],
      optionsSettings: {
        checklist: false,
        header: "",
        subheader: "",
      },
      symptomList: [],
      selectedOptionList: [],
    },
  },
  conclusionHistory: [],
};

const conclusionSlice = createSlice({
  name: "conclusion",
  initialState,
  reducers: {
    setDisplayConclusion(
      state,
      action: PayloadAction<{
        diseaseId: string;
        diagnosisData: diagnosisDataType;
      }>
    ) {
      state.displayConclusion.diseaseId = action.payload.diseaseId;
      state.displayConclusion.diagnosisData = action.payload.diagnosisData;
      const now = new Date();
      const stringifiedDate = now.toString();
      state.displayConclusion.date = stringifiedDate;
      state.conclusionHistory.unshift(state.displayConclusion);
    },
    clearConclusions(state) {
      state.conclusionHistory = [];
    },
  },
});

export const conclusionActions = conclusionSlice.actions;
export default conclusionSlice;
