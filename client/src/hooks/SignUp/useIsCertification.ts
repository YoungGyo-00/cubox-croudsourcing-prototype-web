import {CertificationRes} from 'api/Auth/authType';
import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const useIsCertification = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state == null) {
      alert('본인인증 먼저 진행해주세요');
      navigate('/certification');
    }
  }, [location.state, navigate]);

  return location.state as CertificationRes;
};

export default useIsCertification;
