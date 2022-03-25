import color from 'color';
import useMove from 'hooks/Common/useMove';
import React from 'react';
import styled from 'styled-components';

function HeaderWithoutButton() {
  const moveHome = useMove('/');
  return (
    <Wrapper>
      <Heading1 onClick={moveHome}>CUBOX Manager</Heading1>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

const Heading1 = styled.h1`
  color: ${color.primary};
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export default HeaderWithoutButton;
