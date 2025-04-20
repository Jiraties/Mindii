import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Quest {
  id: string;
  title: string;
  hpReduction: number;
  desc: string;
  completed: boolean;
}

interface MindQuestState {
  hp: number; // from 0 to 100
  quests: Quest[];
  status: "idle" | "loading" | "failed";
  error?: string;
}

const initialState: MindQuestState = {
  hp: 100,
  quests: [
    {
      id: "vent-mindii-mate",
      title: "คุยกับ Mindii Mate",
      desc: "เทใจใส่ AI เพื่อลดพลังลบ!",
      hpReduction: 50,
      completed: false,
    },
    {
      id: "bedtime-journal",
      title: "เขียน Bedtime Journal",
      desc: "ช่วยให้หลับง่ายขึ้น",
      hpReduction: 25,
      completed: false,
    },
    {
      id: "breathing-exercise",
      title: "ทำ Breathing Exercise",
      desc: "ลดความเครียดด้วยการหายใจ",
      hpReduction: 25,
      completed: false,
    },
  ],
  status: "idle",
};

export const saveQuestState = createAsyncThunk(
  "mindQuest/saveQuestState",
  async (_, { getState }) => {
    const state = getState() as RootState;
    try {
      await AsyncStorage.setItem(
        "mindQuestState",
        JSON.stringify(state.mindQuest)
      );
    } catch (e) {
      console.error("Error saving quest state", e);
      throw e;
    }
  }
);

export const loadQuestState = createAsyncThunk<MindQuestState>(
  "mindQuest/loadQuestState",
  async () => {
    try {
      const savedState = await AsyncStorage.getItem("mindQuestState");
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (e) {
      console.error("Error loading quest state", e);
      throw e;
    }
    return initialState;
  }
);

const mindQuestSlice = createSlice({
  name: "mindQuest",
  initialState,
  reducers: {
    completeQuest(state, action: PayloadAction<string>) {
      const quest = state.quests.find((q) => q.id === action.payload);
      console.log("Quest Completed!");
      if (quest && !quest.completed) {
        quest.completed = true;
        state.hp = Math.max(0, state.hp - quest.hpReduction);
      }
    },
    resetQuests(state) {
      state.quests.forEach((q) => {
        q.completed = false;
      });
      state.hp = 100;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuestState.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadQuestState.fulfilled, (state, action) => {
        return { ...state, ...action.payload, status: "idle" };
      })
      .addCase(loadQuestState.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveQuestState.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const mindQuestActions = mindQuestSlice.actions;
export default mindQuestSlice;
