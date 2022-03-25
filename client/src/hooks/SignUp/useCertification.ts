import AuthService from 'api/Auth/AuthService';
import {useNavigate} from 'react-router-dom';

const useCertification = () => {
  const {IMP} = window as any;
  const navigate = useNavigate();
  IMP.init('imp15289551');
  const certification = () => {
    IMP.certification({}, (rsp: any) => {
      if (rsp.success) {
        AuthService.certification(rsp.imp_uid)
          .then(({unique_key, name, age, foreigner}) => {
            navigate('/signup', {state: {unique_key, name, age, foreigner}});
          })
          .catch(error => {
            if (error.response.status === 400) {
              alert('이미 가입한 회원입니다. 로그인 페이지로 이동합니다.');
              navigate('/signin');
            }
            throw error;
          });
      } else {
        console.dir(rsp);
        alert(rsp.error_msg);
      }
    });
  };

  return certification;
};

export default useCertification;
