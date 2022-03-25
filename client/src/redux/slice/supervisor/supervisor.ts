import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import SupervisorService from 'api/Supervisor/SupervisorService';
import {
  GetCenterInfoByUserIdRes,
  GetJobInfoByProjectIdRes,
  GetProjectInfoByCenterIdRes,
} from 'api/Supervisor/supervisorType';
import {
  FetchThunkData,
  getInitialState,
  InitialStateById,
} from 'utils/reduxUtils';

export const getCenters = createAsyncThunk(
  'supervisor/getCenters',
  SupervisorService.getCenterInfoByUserId,
);

export const getProjects = createAsyncThunk(
  'supervisor/getProjects',
  SupervisorService.getProjectInfoByCenterId,
);

export const getJobs = createAsyncThunk(
  'supervisor/getJobs',
  SupervisorService.getJobInfoByProjectId,
);

const projectsByCenterId: InitialStateById<GetProjectInfoByCenterIdRes[]> = {};
const jobsByProjectId: InitialStateById<GetJobInfoByProjectIdRes[]> = {};

export const initialState = {
  centers: getInitialState<GetCenterInfoByUserIdRes[]>(),
  projectsByCenterId,
  jobsByProjectId,
};

const fetchCentersKeepDataNoHandler = new FetchThunkData({
  fetch: getCenters,
  keep: true,
  key: 'centers',
});

const fetchProjectKeepDataNoHandler = new FetchThunkData({
  fetch: getProjects,
  keep: true,
  key: 'projectsByCenterId',
});

const fetchJobsKeepDataNoHandler = new FetchThunkData({
  fetch: getJobs,
  keep: true,
  key: 'jobsByProjectId',
});

const supervisiorSlice = createSlice({
  name: 'supervisor',
  initialState,
  reducers: {
    selecteProject(
      state,
      action: PayloadAction<{centerId: string; projectId: string}>,
    ) {
      const {centerId, projectId} = action.payload;
      state.projectsByCenterId[centerId].data = state.projectsByCenterId[
        centerId
      ].data!.map(item => {
        if (item.projectId === projectId) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
    },
  },
  extraReducers: builder => {
    fetchCentersKeepDataNoHandler.getFetchThunkReducer(builder);
    fetchProjectKeepDataNoHandler.getFetchThunkReducerById(builder);
    fetchJobsKeepDataNoHandler.getFetchThunkReducerById(builder);
  },
});

export default supervisiorSlice.reducer;

export const {selecteProject} = supervisiorSlice.actions;
