import {GetProjectInfoByCenterIdRes} from 'api/Supervisor/supervisorType';
import styled, {css} from 'styled-components';

interface ProjectProps {
  project: GetProjectInfoByCenterIdRes;
  onClick(projectId: string): void;
  isSelected?: boolean;
}

function Project({project, onClick, isSelected}: ProjectProps) {
  const {projectName, projectId, submitted, total} = project;

  const getProjectJob = () => {
    onClick(projectId);
  };

  return (
    <Item name={projectId} isSelected={isSelected} onClick={getProjectJob}>
      <Title isSelected={isSelected}>{projectName}</Title>
      <Summary isSelected={isSelected}>
        <span> {total}</span>
        <span> {submitted}</span>
      </Summary>
    </Item>
  );
}

interface ItemProps {
  isSelected?: boolean;
  name: string;
}

const Item = styled.li<ItemProps>`
  width: 100%;
  text-align: center;
  padding: 0.5rem 0;
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.1);
  &:last-child {
    border-bottom: none;
  }
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
  cursor: pointer;
  ${props =>
    props.isSelected &&
    css`
      background-color: lightgray;
    `}
  position: relative;
`;

const Title = styled.span<{isSelected?: boolean}>`
  background-color: ${props => (props.isSelected ? 'lightgray' : 'none')};
`;

const Summary = styled.div<{isSelected?: boolean}>`
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${props => (props.isSelected ? 'lightgray' : 'none')};
  span {
    background-color: ${props => (props.isSelected ? 'lightgray' : 'none')};
  }
`;

export default Project;
