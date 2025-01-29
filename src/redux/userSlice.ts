import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FormValues } from "modules/user/Login";
import { User } from "modules/user/Profile";
import { RootState } from "redux/store";
import { loginRequest } from "redux/api";

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

export const loginUser = createAsyncThunk<User, FormValues>("user/loginUser", async user => {
  const response = await loginRequest(user);
  return response;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (_, { dispatch }) => {
  storage.removeItem("persist:user");
  dispatch(resetUser());
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(logoutUser.fulfilled, () => {
      return initialState;
    });
  },
});

export const { resetUser } = userSlice.actions;
export const selectUser = (state: RootState): User | null => state.user?.user;
export const selectIsLoggedIn = (state: RootState): string | undefined => state.user?.user?.token;

// Persist configuration
const persistConfig = {
  key: "user",
  storage,
};

export default persistReducer(persistConfig, userSlice.reducer);
