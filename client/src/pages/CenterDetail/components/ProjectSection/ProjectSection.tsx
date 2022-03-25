import {GetProjectInfoByCenterIdRes} from 'api/Supervisor/supervisorType';
import styled from 'styled-components';
import Project from './Project';

interface ProjectSectionProps {
  projects: GetProjectInfoByCenterIdRes[];
  onClick(projectId: string): void;
}

function ProjectSection({projects, onClick}: ProjectSectionProps) {
  return (
    <Section>
      <ul>
        {projects.map(project => (
          <Project
            isSelected={project.isSelected}
            onClick={onClick}
            key={project.projectId}
            project={project}
          />
        ))}
      </ul>
    </Section>
  );
}

const Section = styled.section`
  width: 20%;
  border-radius: 0.25rem;
  padding: 0.625rem;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  margin-right: 0.625rem;
  height: 100%;
`;

export default ProjectSection;
