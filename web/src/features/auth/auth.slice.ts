import { Role } from '@/types/auth.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | null;
  user: {
    id: number;
    email: string;
    name: string;
    image?: string;
    role: Role;
  } | null;
  expiresAt: number | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setAuthState(state: AuthState, action: PayloadAction<AuthState>) {
      console.log('set auth state');
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.expiresAt = action.payload.expiresAt;
    },
  },
});

const authReducer = authSlice.reducer;
export const { setAuthState } = authSlice.actions;

export default authReducer;
export type { AuthState };
