import Button, {DisabledButton} from 'common/Button';
import styled from 'styled-components';
import Modal from 'react-modal';
import {GetWorkersInfoByCenterIdRes} from 'api/Supervisor/supervisorType';
import {SerializedError} from '@reduxjs/toolkit';
import {useEffect, useState} from 'react';
import AssignableWorkerList from './AssignableWorkerList';
import AssignedWorker from './AssignedWorker';
import SupervisorService from 'api/Supervisor/SupervisorService';

interface WorkerModalProps {
  isModalOpen: boolean;
  onRequestClose(): void;
  workerState: {
    data: GetWorkersInfoByCenterIdRes[] | null;
    loading: boolean;
    error: SerializedError | null;
  };
  jobId: string;
  centerId: string;
  projectId: string;
}

function WorkerModal({
  isModalOpen,
  onRequestClose,
  workerState,
  jobId,
  centerId,
  projectId,
}: WorkerModalProps) {
  const {data, error, loading} = workerState;
  const [workers, setWorkers] = useState(data);
  const [assignedWorker, setAssignedWorker] =
    useState<GetWorkersInfoByCenterIdRes>();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setWorkers(data);
  }, [data]);

  useEffect(() => {
    if (assignedWorker !== undefined) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [assignedWorker]);

  const deleteAssignedWorker = (worker: GetWorkersInfoByCenterIdRes) => {
    if (workers == null) {
      return;
    }
    setAssignedWorker(undefined);
    const newWorkers = [...workers, worker];
    setWorkers(newWorkers);
  };

  const onSetAssignedWorker = (workerId: string) => {
    if (workers == null || data == null) {
      return;
    }
    if (workers.length - 1 < data.length - 1) {
      return;
    }

    const newWorkers = workers.slice();
    const index = workers.findIndex(worker => worker.workerId === workerId);
    setAssignedWorker(newWorkers[index]);
    newWorkers.splice(index, 1);
    setWorkers(newWorkers);
  };

  const onClick = () => {
    const workerId = assignedWorker!.workerId;
    SupervisorService.assignJob({centerId, jobId, projectId, workerId})
      .then(() => {
        onRequestClose();
        window.location.replace(`/center/${centerId}`);
      })
      .catch((e: any) => alert(e.response.data));
  };

  if (loading) {
    return <div>로딩중</div>;
  }

  if (error) {
    alert((error as any).response.data);
  }

  return (
    <>
      {workers && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={onRequestClose}
          style={{overlay: overlayStyle, content: contentStyle}}>
          <ModalWrapper>
            <AssignedWorker
              deleteAssignedWorker={deleteAssignedWorker}
              worker={assignedWorker}
            />
            <AssignableWorkerList
              workers={workers}
              onSetAssignedWorker={onSetAssignedWorker}
            />
            {isActive ? (
              <Button onClick={onClick} style={ButtonStyle}>
                할당하기
              </Button>
            ) : (
              <DisabledButton style={ButtonStyle}>할당하기</DisabledButton>
            )}
          </ModalWrapper>
        </Modal>
      )}
    </>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ButtonStyle = {
  marginTop: 'auto',
};

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
};

const contentStyle = {
  width: '50%',
  height: '80%',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

export default WorkerModal;
