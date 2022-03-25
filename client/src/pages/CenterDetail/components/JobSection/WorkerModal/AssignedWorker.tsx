import {GetWorkersInfoByCenterIdRes} from 'api/Supervisor/supervisorType';
import styled from 'styled-components';

interface AssignedWorkerProps {
  worker?: GetWorkersInfoByCenterIdRes;
  deleteAssignedWorker(worker: GetWorkersInfoByCenterIdRes): void;
}

function AssignedWorker({worker, deleteAssignedWorker}: AssignedWorkerProps) {
  const onClick = () => {
    deleteAssignedWorker(worker!);
  };

  return (
    <Wrapper>
      {worker && (
        <Button onClick={onClick}>{worker.User.workerNickName} x</Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 1.875rem;
`;

const Button = styled.button``;
export default AssignedWorker;
