import SupervisorService from 'api/Supervisor/SupervisorService';
import {GetJobInfoByProjectIdRes} from 'api/Supervisor/supervisorType';
import useProjectsSelects from 'hooks/CenterDetail/useProjectsSelect';
import useClickApi from 'hooks/Common/useClickApi';
import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import JobClassifier from '../utils/JobClassfier';
import JobSection from './JobSection/JobSection';
import ProjectSection from './ProjectSection/ProjectSection';

interface SectionWrapperProps {
  centerId: string;
}

function SectionWrapper({centerId}: SectionWrapperProps) {
  const [select, setSelect] = useState<SelectState>('total');
  const [jobToPass, setJobToPass] = useState([] as GetJobInfoByProjectIdRes[]);
  const {projects, selectByProjectId} = useProjectsSelects(centerId);
  const [selectingProjectId, setSelecttingProjectId] = useState<string>();
  const {
    data: jobs,
    onClick,
    error,
    loading,
  } = useClickApi(SupervisorService.getJobInfoByProjectId);
  const jobClassifier = useMemo(() => new JobClassifier(jobs), [jobs]);

  const selectProject = (projectId: string) => {
    selectByProjectId(projectId);
    onClick({centerId, projectId});
    setSelecttingProjectId(projectId);
  };

  const selectStateClick = (selectState: SelectState) => {
    setSelect(selectState);
  };

  useEffect(() => {
    jobClassifier.classifyJobs();
  }, [jobClassifier, jobs]);

  useEffect(() => {
    setJobToPass(jobClassifier.getPassToJob(select));
  }, [select, jobClassifier]);

  return (
    <>
      {projects && (
        <Wrapper>
          <ProjectSection onClick={selectProject} projects={projects} />
          <JobSection
            projectId={selectingProjectId}
            centerId={centerId}
            error={error}
            loading={loading}
            jobs={jobToPass}
            selectClick={selectStateClick}
            select={select}
          />
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 6.25rem);
`;

export type SelectState = 'total' | 'assigned' | 'waiting' | 'compeleted';

export default SectionWrapper;
