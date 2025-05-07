import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | null;
};
const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setAccessToken(state: AuthState, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
const { setAccessToken } = authSlice.actions;
export { setAccessToken };
export default authReducer;
