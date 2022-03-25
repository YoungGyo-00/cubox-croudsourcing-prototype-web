import color from 'color';
import React from 'react';
import styled from 'styled-components';

function NoCenterMain() {
  return (
    <Wrapper>
      <MessageBox>
        <span>관리하는 센터가 없습니다.</span>
      </MessageBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  height: calc(100vh - 10.25rem);
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

const MessageBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  span {
    font-size: 1.875rem;
    font-weight: 700;
    color: ${color.gray[2]};
  }
`;

export default NoCenterMain;
