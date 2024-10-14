import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authenticationState {
  token: string;
  isAuthenticated: boolean;
  userInformation: {
    name: string;
    birthday: string;
  };
}

const initialState: authenticationState = {
  token: "",
  isAuthenticated: false,
  userInformation: {
    name: "",
    birthday: "",
  },
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem("token", action.payload);
    },
    setUserInformation: (
      state,
      action: PayloadAction<{
        name: string;
        birthday: string;
      }>
    ) => {
      state.userInformation = action.payload;
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      AsyncStorage.removeItem("token");
    },
  },
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice;
