import {GetCenterInfoByUserIdReq} from 'api/Supervisor/supervisorType';
import {useAppDispatch, useAppSelector} from 'hooks/Common/sotreHooks';
import {useCallback, useEffect} from 'react';
import {getCenters} from 'redux/slice/supervisor/supervisor';

export default function useCenter(req: GetCenterInfoByUserIdReq) {
  const {centers} = useAppSelector(state => state.supervisor);
  const dispatch = useAppDispatch();
  const fetchData = useCallback(() => {
    dispatch(getCenters(req));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {...centers};
}
