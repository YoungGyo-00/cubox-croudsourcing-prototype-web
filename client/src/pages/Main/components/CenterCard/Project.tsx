import {Project as ProjectType} from 'api/Supervisor/supervisorType';
import color from 'color';
import React, {useMemo} from 'react';
import styled, {keyframes} from 'styled-components';

interface ProjectProps {
  project: ProjectType;
}

function Project({project}: ProjectProps) {
  const {projectName, finishedJobs, processingJobs, totalJobs, projectId} =
    project;

  const jobGraph = useMemo(
    () => getSettingJob({finishedJobs, processingJobs, totalJobs}),
    [finishedJobs, processingJobs, totalJobs],
  );

  return (
    <Wrapper>
      <LabelNormal>
        <span>{projectName}</span>
        <GraphWrapper>
          {jobGraph.map(graph => (
            <Graph
              percent={graph.value}
              backgroundColor={graph.background}
              zindex={graph.zIndex}
              key={projectId + graph.name}
            />
          ))}
        </GraphWrapper>
      </LabelNormal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &:not(:nth-child(1)) {
    margin-top: 0.625rem;
  }
`;

const LabelNormal = styled.label`
  span {
    width: 20%;
    display: block;
    font-size: 0.875rem;
    text-overflow: ellipsis;
    max-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  display: flex;
`;

const GraphWrapper = styled.div`
  width: 80%;
  position: relative;
`;

const GraphAnimation = (percent: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${percent}%;
  }
`;

const Graph = styled.div<{
  zindex: number;
  backgroundColor?: string;
  percent: number;
}>`
  z-index: ${props => props.zindex};
  background-color: ${props => props.backgroundColor || '#eeeeee'} !important;
  position: absolute;
  left: 0;
  animation: ${props => GraphAnimation(props.percent)} 0.2s linear;
  animation-fill-mode: forwards;
  top: 0;
  bottom: 0;
`;

type JobObj = {
  finishedJobs: number;
  processingJobs: number;
  totalJobs: number;
};

function getSettingJob({finishedJobs, totalJobs, processingJobs}: JobObj) {
  const zIndex = 300;
  const mappedJob = [
    {
      name: 'finished',
      value: (finishedJobs / totalJobs) * 100,
      zIndex: 0,
      background: '',
    },
    {
      name: 'total',
      value: 100,
      zIndex: 0,
      background: '',
    },
    {
      name: 'processing',
      value: (processingJobs / totalJobs) * 100,
      zIndex: 0,
      background: '',
    },
  ];
  mappedJob.sort((jobLeft, jobRight) => jobLeft.value - jobRight.value);
  return mappedJob.map((job, i) => {
    job.zIndex = zIndex - 100 * i;
    job.background = getBackgroundColor(job.name as JobStatus);
    return job;
  });
}

type JobStatus = 'total' | 'proceesing' | 'finished';

function getBackgroundColor(jobStatus: JobStatus) {
  switch (jobStatus) {
    case 'proceesing':
      return color.status.warning;
    case 'finished':
      return color.status.idle;
    default:
      return color.background;
  }
}

export default Project;
