import React from 'react';
import styled from 'styled-components';
import SupervisorAuth from './SupervisorAuth';
import WorkerAuth from './WorkerAuth';

interface AuthInputProps {
  autority: string;
  onAuthAutority(): void;
}

function AuthInput({autority, onAuthAutority}: AuthInputProps) {
  return (
    <Wrapper>
      {autority === 'worker' ? (
        <WorkerAuth />
      ) : (
        <SupervisorAuth onAuthAutority={onAuthAutority} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default AuthInput;
