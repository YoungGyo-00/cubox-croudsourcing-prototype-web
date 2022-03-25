import {useAppDispatch, useAppSelector} from 'hooks/Common/sotreHooks';
import {useCallback, useEffect} from 'react';
import {getProjects} from 'redux/slice/supervisor/supervisor';

export default function useProjects(centerId: string) {
  const projects = useAppSelector(
    state => state.supervisor.projectsByCenterId[centerId],
  );
  const dispatch = useAppDispatch();
  const fetchData = useCallback(() => {
    dispatch(getProjects(centerId));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...projects,
  };
}
