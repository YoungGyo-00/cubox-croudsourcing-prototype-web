import color from 'color';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

interface CenterInfoProps {
  label: string;
  isDividerExist?: boolean;
  count: number;
  projectStatus: 'create' | 'proccessing' | 'finished';
  centerId: string;
}

function CenterInfo({
  label,
  isDividerExist,
  count,
  projectStatus,
  centerId,
}: CenterInfoProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/project', {state: {centerId, projectStatus}});
  };
  return (
    <Wrapper onClick={onClick}>
      <Inner />
      <LabelSmall>
        {label}
        <Count>{count}</Count>
      </LabelSmall>
      {isDividerExist && <Divider />}
    </Wrapper>
  );
}

const Inner = styled.div`
  opacity: 0;
  position: absolute;
  left: 0.125rem;
  right: 0.125rem;
  top: 0;
  bottom: -0.9375rem;
  border-radius: 0.25rem;
  transition: all 0.3s;
`;

const Wrapper = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 0.625rem;
  position: relative;
  cursor: pointer;
  &:hover ${Inner} {
    opacity: 0.3;
    background-color: ${color.gray[4]};
  }
`;

const LabelSmall = styled.label`
  font-size: 0.875rem;
`;

const Count = styled.div`
  text-align: center;
  font-size: 1.25rem;
  margin-top: 1.25rem;
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 2.875rem;
  background-color: #222222;
  position: absolute;
  right: 0;
  bottom: -0.625rem;
  border-left: 0.0625rem solid;
`;

export default CenterInfo;
