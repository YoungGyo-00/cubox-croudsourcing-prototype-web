import AuthService from 'api/Auth/AuthService';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';

const useSignUp = () => {
  const navigate = useNavigate();
  const mutaions = useMutation(AuthService.signup, {
    onSuccess: () => {
      navigate('/signin');
    },
    onError: (error: any) => {
      alert(error.response.data);
    },
  });

  return mutaions;
};

// const useSignUp1 = (req: SignUpReq) => {
//   const [message, setMessage] = useState('');

//   const navigate = useNavigate();
//   const signup = async () => {
//     try {
//       await AuthService.signup(req);
//       navigate('/signin');
//     } catch (error: any) {
//       setMessage(error.response.data as string);
//     }
//   };

//   useEffect(() => {
//     if (message) {
//       alert(message);
//       setMessage('');
//     }
//   }, [message, setMessage]);

//   return {signup};
// };

export default useSignUp;
