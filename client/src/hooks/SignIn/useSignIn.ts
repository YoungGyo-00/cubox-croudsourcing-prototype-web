import AuthService from 'api/Auth/AuthService';
import {SignInReq} from 'api/Auth/authType';
import {useAppDispatch} from 'hooks/Common/sotreHooks';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {setUserId} from 'redux/slice/auth/auth';

const useSignIn = (req: SignInReq) => {
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const signin = async () => {
    try {
      const {userId} = await AuthService.signin(req);
      dispatch(setUserId({userId}));
      navigate('/');
    } catch (error: any) {
      setMessage(error.response.data as string);
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      setMessage('');
    }
  }, [message]);

  return {signin};
};

export default useSignIn;
