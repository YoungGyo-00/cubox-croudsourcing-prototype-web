import color from 'color';
import {FormInfo, InputName} from 'pages/SignUp/utils/FormInfo';
import React from 'react';
import styled, {css} from 'styled-components';

interface InputProps {
  formInfo: FormInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  validateMessage: string;
  fillWidth?: number;
}

function Input({
  onChange,
  value,
  formInfo,
  validateMessage,
  fillWidth,
}: InputProps) {
  const {name, placeholder} = formInfo;

  return (
    <Wrapper fillWidth={fillWidth}>
      <InputStyled
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={getType(name as InputName)}
      />
      {validateMessage && <ValidationMsg>{validateMessage}</ValidationMsg>}
    </Wrapper>
  );
}

const Wrapper = styled.div<{fillWidth?: number}>`
  height: 3.3125rem;
  background-color: #ffffff;
  border: 0.0625rem solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5rem;
  ${props =>
    props.fillWidth &&
    css`
      width: ${props.fillWidth}%;
    `}
`;

const InputStyled = styled.input`
  border: none;
  background-color: inherit;
  padding: 0.25rem;
  width: 100%;
`;

const ValidationMsg = styled.span`
  background-color: #fff;
  font-size: 0.875rem;
  color: ${color.status.alarm};
`;

function getType(name: InputName) {
  if (name === 'confirmPassword') {
    return 'password';
  }
  return name;
}

export default Input;
