import {SerializedError} from '@reduxjs/toolkit';
import {GetJobInfoByProjectIdRes} from 'api/Supervisor/supervisorType';
import Button from 'common/Button';
import React, {useState} from 'react';
import styled from 'styled-components';
import {SelectState} from '../SectionWrapper';
import Job from './Job';

interface JobsSectionProps {
  jobs: GetJobInfoByProjectIdRes[];
  selectClick(select: SelectState): void;
  select: SelectState;
  error: SerializedError | null;
  loading: boolean;
  centerId: string;
  projectId?: string;
}

function JobSection({
  jobs,
  select: s,
  selectClick,
  error,
  loading,
  centerId,
  projectId,
}: JobsSectionProps) {
  const [select, setSelecte] = useState(s);
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = (e.target as HTMLButtonElement).name as SelectState;
    setSelecte(name);
    selectClick(name);
  };

  if (error) {
    alert((error as any).response.data);
  }

  if (loading) {
    return <div>로딩중</div>;
  }

  return (
    <Section>
      <ButtonWrapper onClick={onClick}>
        <Button name="total" isActive={isTotalSelected(select)}>
          total
        </Button>
        <Button name="assigned" isActive={isAssignedSelected(select)}>
          assigned
        </Button>
        <Button name="compeleted" isActive={isCompelecteSelected(select)}>
          compeleted
        </Button>
        <Button name="waiting" isActive={isWaitinSelected(select)}>
          waiting
        </Button>
      </ButtonWrapper>
      <JobList>
        {jobs.length !== 0 &&
          jobs.map(job => (
            <Job
              projectId={projectId!}
              centerId={centerId}
              key={job.jobId}
              job={job}
            />
          ))}
      </JobList>
    </Section>
  );
}

const Section = styled.section`
  width: 70%;
`;

const JobList = styled.ul`
  margin-top: 1.25rem;
`;

const ButtonWrapper = styled.div`
  ${Button} + ${Button} {
    margin-left: 0.5rem;
  }
`;

function isTotalSelected(select: SelectState) {
  return select === 'total';
}
function isAssignedSelected(select: SelectState) {
  return select === 'assigned';
}
function isCompelecteSelected(select: SelectState) {
  return select === 'compeleted';
}
function isWaitinSelected(select: SelectState) {
  return select === 'waiting';
}

export default JobSection;
