import {GetJobInfoByProjectIdRes} from 'api/Supervisor/supervisorType';
import {SelectState} from '../components/SectionWrapper';

export default class JobClassifier<G extends GetJobInfoByProjectIdRes> {
  private waitngJobs: G[] = [];
  private assingedJobs: G[] = [];
  private compeleteJobs: G[] = [];
  private WATING = 1;
  private ASSIGNED = 2;
  private COMPELETE = 3;

  constructor(private jobs: G[] | null) {}

  public classifyJobs() {
    if (this.jobs == null) {
      return;
    }

    this.jobs.forEach(job => {
      const {stateId} = job;
      this.pushByStateId(stateId, job);
    });
  }

  private pushByStateId(stateId: number, job: G) {
    switch (stateId) {
      case this.WATING:
        this.waitngJobs.push(job);
        return;
      case this.ASSIGNED:
        this.assingedJobs.push(job);
        return;
      case this.COMPELETE:
        this.compeleteJobs.push(job);
        return;
      default:
        throw Error('할당되지 않은 stateId 입니다.');
    }
  }

  public getPassToJob(selectState: SelectState) {
    switch (selectState) {
      case 'assigned':
        return this.assingedJobs;
      case 'compeleted':
        return this.compeleteJobs;
      case 'waiting':
        return this.waitngJobs;
      default:
        return this.jobs || [];
    }
  }
}
