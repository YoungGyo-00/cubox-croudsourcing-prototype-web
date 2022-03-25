import {GetJobInfoByProjectIdRes} from 'api/Supervisor/supervisorType';
import styled from 'styled-components';
import {GoPerson} from 'react-icons/go';
import {useMemo, useState} from 'react';
import WorkerModal from './WorkerModal/WorkerModal';
import useClickApi from 'hooks/Common/useClickApi';
import SupervisorService from 'api/Supervisor/SupervisorService';

interface JobProps {
  job: GetJobInfoByProjectIdRes;
  centerId: string;
  projectId: string;
}

function Job({job, centerId, projectId}: JobProps) {
  const {jobName, stateId, jobId} = job;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data, loading, error, onClick} = useClickApi(
    SupervisorService.getWorkersInfoByCenterId,
  );
  const workersState = useMemo(
    () => ({
      data,
      loading,
      error,
    }),
    [data, loading, error],
  );

  const onRequestClose = () => {
    setIsModalOpen(false);
  };

  const onModalOpenClick = () => {
    onClick(centerId);
    setIsModalOpen(true);
  };

  return (
    <JobItem>
      <Title>{jobName}</Title>
      {isWaitingJob(stateId as StateId) && (
        <WorkerButtonWrapper>
          <WorkerButton onClick={onModalOpenClick}>
            워커 배정하기
            <GoPerson />
          </WorkerButton>
          <WorkerModal
            centerId={centerId}
            jobId={jobId}
            projectId={projectId}
            workerState={workersState}
            isModalOpen={isModalOpen}
            onRequestClose={onRequestClose}></WorkerModal>
        </WorkerButtonWrapper>
      )}
    </JobItem>
  );
}

const JobItem = styled.li`
  display: flex;
  padding: 0.625rem 1.25rem;
  border: 0.0625rem solid;
  justify-content: space-between;
  &:not(:nth-child(1)) {
    margin-top: 0.3125rem;
  }
`;

const Title = styled.div``;

const WorkerButtonWrapper = styled.div`
  position: relative;
`;

const WorkerButton = styled.button`
  border: 0.0625rem solid;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`;

type StateId = 1 | 2 | 3;

function isWaitingJob(stateId: StateId) {
  return stateId === 1;
}

export default Job;
