import apiClient from 'api/apiClient';
import {
  AssignJobReq,
  GetCenterInfoByUserIdReq,
  GetCenterInfoByUserIdRes,
  GetJobInfoByProjectIdReq,
  GetJobInfoByProjectIdRes,
  GetProjectInfoByCenterIdRes,
  GetWorkersInfoByCenterIdRes,
} from './supervisorType';

const baseUrl = '/api/supervisor';

class SupervisorService {
  public static async getCenterInfoByUserId(req: GetCenterInfoByUserIdReq) {
    try {
      const {data} = await apiClient.get<GetCenterInfoByUserIdRes[]>(
        `${baseUrl}`,
        {params: req},
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async getWorkersInfoByCenterId(centerId: string) {
    try {
      const {data} = await apiClient.get<GetWorkersInfoByCenterIdRes[]>(
        `${baseUrl}/workers`,
        {
          params: {centerId},
        },
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async getProjectInfoByCenterId(centerId: string) {
    try {
      const {data} = await apiClient.get<GetProjectInfoByCenterIdRes[]>(
        `${baseUrl}/project`,
        {
          params: {centerId},
        },
      );
      return data.map(item => {
        item.isSelected = false;
        return item;
      });
    } catch (error) {
      throw error;
    }
  }

  public static async getJobInfoByProjectId(req: GetJobInfoByProjectIdReq) {
    try {
      const {data} = await apiClient.get<GetJobInfoByProjectIdRes[]>(
        `${baseUrl}/job`,
        {
          params: {projectId: req.projectId, centerId: req.centerId},
        },
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async assignJob(req: AssignJobReq) {
    const {centerId, jobId, projectId, workerId} = req;
    try {
      await apiClient.post(
        `${baseUrl}/assignment`,
        {
          jobId,
          workerId,
        },
        {
          params: {centerId: centerId, projectId: projectId},
        },
      );
    } catch (error) {}
  }
}

export default SupervisorService;
