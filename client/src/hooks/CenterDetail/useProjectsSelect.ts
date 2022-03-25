import {useAppDispatch} from 'hooks/Common/sotreHooks';
import {selecteProject} from 'redux/slice/supervisor/supervisor';
import useProjects from './useProjects';

export default function useProjectsSelects(centerId: string) {
  const {data: projects, error, loading} = useProjects(centerId);
  const dispatch = useAppDispatch();

  const selectByProjectId = (projectId: string) => {
    dispatch(selecteProject({centerId, projectId}));
  };

  return {projects, selectByProjectId, error, loading};
}
