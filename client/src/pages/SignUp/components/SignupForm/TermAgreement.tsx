import React from 'react';
import styled from 'styled-components';
import {Link as LinckCommon} from 'react-router-dom';

interface TermAgreementProps {
  agree: boolean;
  onCheck(e: React.ChangeEvent<HTMLInputElement>): void;
}

function TermAgreement({agree, onCheck}: TermAgreementProps) {
  return (
    <AggrementWrapper>
      <span>개인정보 수집 동의</span>
      <Link to={'/signup'}>자세히</Link>
      <CheckBox type="checkbox" checked={agree} onChange={onCheck} />
    </AggrementWrapper>
  );
}
const AggrementWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
  span {
    color: rgba(0, 0, 0, 0.7);
    font-weight: 700;
  }
`;

const Link = styled(LinckCommon)`
  color: black;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

const CheckBox = styled.input``;

export default TermAgreement;
