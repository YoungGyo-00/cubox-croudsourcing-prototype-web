import AuthService from 'api/Auth/AuthService';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {authenticate, setUserId} from 'redux/slice/auth/auth';
import {useAppDispatch, useAppSelector} from './sotreHooks';

const useIsAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isAuth} = useAppSelector(state => state.auth);
  useEffect(() => {
    AuthService.me()
      .then(({roleId, userId}) => {
        dispatch(authenticate({isAuth: true, roleId, userId}));
      })
      .catch(() => {
        dispatch(authenticate({isAuth: false, roleId: null, userId: null}));
        dispatch(setUserId({userId: null}));
        navigate('/signin');
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth');
    }
  }, [isAuth, navigate]);

  return isAuth;
};

export default useIsAuth;
