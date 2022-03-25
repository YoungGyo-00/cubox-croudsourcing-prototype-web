import color from 'color';
import styled from 'styled-components';

interface ButtonProps {
  isActive?: boolean;
}

const Button = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  padding: 0.3125rem;
  border-radius: 0.3125rem;
  background-color: ${props =>
    props.isActive === undefined || props.isActive
      ? color.buttonColor
      : 'gray'};
  color: #fff;
  transition: all 0.2s;
  &:hover {
    filter: brightness(0.85);
  }
  width: 100%;
`;

const DisabledButton = styled.button`
  border: none;
  padding: 0.3125rem;
  background-color: gray;
  border-radius: 0.3125rem;
  color: white;
  width: 100%;
`;

export {DisabledButton};
export default Button;
