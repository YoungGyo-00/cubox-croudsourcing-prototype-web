import {GetWorkersInfoByCenterIdRes} from 'api/Supervisor/supervisorType';
import styled from 'styled-components';
import AssignableWorkerItme from './AssignableWorkerItme';

interface AssignableWorkerListProps {
  workers: GetWorkersInfoByCenterIdRes[];
  onSetAssignedWorker(workerId: string): void;
}

function AssignableWorkerList({
  onSetAssignedWorker,
  workers,
}: AssignableWorkerListProps) {
  return (
    <>
      {workers && (
        <WorkerList>
          {workers.map(worker => (
            <AssignableWorkerItme
              onSetAssignedWorker={onSetAssignedWorker}
              key={worker.workerId}
              worker={worker}
            />
          ))}
        </WorkerList>
      )}
    </>
  );
}

const WorkerList = styled.ul``;

export default AssignableWorkerList;
