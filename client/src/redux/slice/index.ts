import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth/auth';
import supervisor from './supervisor/supervisor';

const rootReducer = combineReducers({
  auth,
  supervisor,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
