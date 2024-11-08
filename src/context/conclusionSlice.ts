import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { conclusion } from "../models/conclusionTypes";
import { diagnosisDataType } from "../models/diagnosisTypes";
import { FIREBASE_FIRESTORE } from "../../FirebaseConfig";
import {
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
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
    const state = getState() as RootState;
    console.log("writing ConclusionHistory");
    try {
      // Fetch the existing conclusion history
      const conclusionHistoryRef = doc(db, "conclusionHistory", uid);
      const docSnap = await getDoc(conclusionHistoryRef);
      let existingHistory = [];
      if (docSnap.exists()) {
        existingHistory = docSnap.data().conclusionHistory || [];
      }

      // Append the new conclusion history
      const newConclusion = state.conclusion.displayConclusion;
      const updatedHistory = [newConclusion, ...existingHistory];

      // Update the document with the new conclusion history
      await updateDoc(conclusionHistoryRef, {
        conclusionHistory: updatedHistory,
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
  const conclusionHistoryRef = doc(db, "conclusionHistory", uid);
  const docSnap = await getDoc(conclusionHistoryRef);
  if (docSnap.exists()) {
    const fetchedConclusionHistory = docSnap.data();
    return fetchedConclusionHistory.conclusionHistory;
  } else {
    console.log("No such document!");
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
    setConclusionHistory(state, action: PayloadAction<displayConclusion[]>) {
      state.conclusionHistory = action.payload;
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
