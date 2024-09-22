import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
}

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: { username: "", email: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
