import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  isAuth: boolean;
  userId: string | null;
  roleId: number | null;
  roleAuth: {
    isRunning: boolean;
    isEmailProcess: boolean;
  };
};

const initialState: InitialState = {
  isAuth: false,
  userId: null,
  roleId: null,
  roleAuth: {
    isRunning: false,
    isEmailProcess: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(
      state,
      action: PayloadAction<{
        isAuth: boolean;
        roleId: number | null;
        userId: string | null;
      }>,
    ) {
      state.isAuth = action.payload.isAuth;
      state.roleId = action.payload.roleId;
      state.userId = action.payload.userId;
    },
    setUserId(state, action: PayloadAction<{userId: string | null}>) {
      state.userId = action.payload.userId;
    },
    timerStart(state) {
      state.roleAuth.isRunning = true;
    },
    timerStop(state) {
      state.roleAuth.isRunning = false;
    },
    setEmailProcessStatus(
      state,
      action: PayloadAction<{isEmailProcess: boolean}>,
    ) {
      state.roleAuth.isEmailProcess = action.payload.isEmailProcess;
    },
  },
});

export default authSlice.reducer;
export const {
  authenticate,
  setUserId,
  timerStart,
  timerStop,
  setEmailProcessStatus,
} = authSlice.actions;
