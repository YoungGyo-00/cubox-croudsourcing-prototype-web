import React from 'react';
import styled from 'styled-components';

interface SelectInputProps {
  onSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
}

function SelectInput({onSelectChange}: SelectInputProps) {
  return (
    <Wrapper>
      <Select name="authority" id="authority-select" onChange={onSelectChange}>
        <Option value="">-- 권한 설정 ----------------</Option>
        <Option value="supervisor">관리자</Option>
        <Option value="worker">워커</Option>
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 3.3125rem;
  background-color: #ffffff;
  border: 0.0625rem solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5rem;
`;

const Select = styled.select`
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  padding: 0.25rem;
`;

const Option = styled.option``;

export default SelectInput;
