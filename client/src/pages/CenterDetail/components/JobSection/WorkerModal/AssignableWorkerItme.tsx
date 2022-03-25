import {GetWorkersInfoByCenterIdRes} from 'api/Supervisor/supervisorType';
import React from 'react';
import styled from 'styled-components';

interface AssignableWorkerItmeProps {
  worker: GetWorkersInfoByCenterIdRes;
  onSetAssignedWorker(workerId: string): void;
}

function AssignableWorkerItme({
  worker,
  onSetAssignedWorker,
}: AssignableWorkerItmeProps) {
  const onClick = () => {
    onSetAssignedWorker(worker.workerId);
  };

  return (
    <WorkerItem onClick={onClick}>{worker.User.workerNickName}</WorkerItem>
  );
}
const WorkerItem = styled.li`
  border-bottom: 0.0625rem solid;
  text-align: center;
  cursor: pointer;
  &:nth-child(1) {
    margin-top: 0.625rem;
  }
  &:not(:nth-child(1)) {
    margin-top: 0.3125rem;
  }
  &:hover {
    filter: brightness(0.9);
  }
`;

export default AssignableWorkerItme;
