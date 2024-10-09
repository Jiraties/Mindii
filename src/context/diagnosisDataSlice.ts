import { createSlice } from "@reduxjs/toolkit";

import { diagnosisDataType } from "../models/diagnosisTypes";

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
  reducers: {},
});

export const diagnosisDataActions = diagnosisDataSlice.actions;
export default diagnosisDataSlice;
