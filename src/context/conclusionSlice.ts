import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { conclusion } from "../models/conclusionTypes";
import { diagnosisDataType } from "../models/diagnosisTypes";
import { FIREBASE_FIRESTORE } from "../../FirebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { RootState } from "./store";

interface displayConclusion {
  diseaseId: string;
  diagnosisData: diagnosisDataType;
  date: string;
}

interface ConclusionState {
  displayConclusion: displayConclusion;
  conclusionHistory: displayConclusion[];
  thunkStatus: "loading" | "succeeded" | "failed";
  thunkError?: string;
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
  thunkStatus: "loading",
};

const db = FIREBASE_FIRESTORE;

export const writeConclusionHistory = createAsyncThunk(
  "conclusion/writeConclusionHistory",
  async (uid: any, { getState }) => {
    console.log("writeConclusionHistory");
    const state = getState() as RootState;
    try {
      await setDoc(doc(db, "conclusionHistory", uid), {
        conlusionHistory: state.conclusion.conclusionHistory,
      });
      console.log("setting doc");
    } catch (error) {
      console.log("writeUserData Error: ", error);
      throw error;
    }
  }
);

export const fetchConclusionHistory = createAsyncThunk<
  displayConclusion[],
  string,
  { state: RootState }
>("conclusion/fetchConclusionHistory", async (uid, { getState }) => {
  console.log("fetchConclusionHistory");
  try {
    const docRef = doc(db, "conclusionHistory", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const conclusionHistory = docSnap.data()
        .conclusionHistory as displayConclusion[];
      getState().conclusion.conclusionHistory = conclusionHistory;
      return docSnap.data().conclusionHistory;
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.log("fetchConclusionHistory Error: ", error);
    throw error;
  }
});

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
      if (action.payload.diseaseId === "no_match") {
        state.displayConclusion.diseaseId = "no_match";
      } else {
        state.displayConclusion.diseaseId = action.payload.diseaseId;
        state.displayConclusion.diagnosisData = action.payload.diagnosisData;
        const now = new Date();
        const stringifiedDate = now.toString();
        state.displayConclusion.date = stringifiedDate;
        state.conclusionHistory.unshift(state.displayConclusion);
      }
    },
    viewConclusion(state, action: PayloadAction<string>) {
      state.displayConclusion.diseaseId = action.payload;
    },
    clearConclusions(state) {
      state.conclusionHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(writeConclusionHistory.pending, (state) => {
        state.thunkStatus = "loading";
      })
      .addCase(writeConclusionHistory.fulfilled, (state) => {
        state.thunkStatus = "succeeded";
      })
      .addCase(writeConclusionHistory.rejected, (state, action) => {
        state.thunkStatus = "failed";
        state.thunkError = action.error.message;
      });
  },
});

export const conclusionActions = conclusionSlice.actions;
export default conclusionSlice;
