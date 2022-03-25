export type GetCenterInfoByUserIdReq = {
  userId: string;
};

export type Center = {
  centerId: string;
  centerName: string;
  createdProjects: number;
  processingProjects: number;
  finishedProjects: number;
  centerStatus: number;
};

export type Project = {
  projectId: string;
  projectName: string;
  totalJobs: number;
  createdJobs: number;
  processingJobs: number;
  finishedJobs: number;
};

export type GetCenterInfoByUserIdRes = {
  center: Center;
  project: Project[];
};

export type GetWorkersInfoByCenterIdRes = {
  workerId: string;
  User: {
    workerNickName: string;
  };
};

export type GetProjectInfoByCenterIdRes = {
  projectId: string;
  projectName: string;
  total: number;
  submitted: number;
  isSelected?: boolean;
};

export type GetJobInfoByProjectIdReq = {
  projectId: string;
  centerId: string;
};

export type GetJobInfoByProjectIdRes = {
  jobId: string;
  jobName: string;
  total: number;
  submitted: number;
  workerId: string;
  stateId: number;
};

export type AssignJobReq = {
  centerId: string;
  projectId: string;
  jobId: string;
  workerId: string;
};
