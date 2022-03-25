import AuthService from 'api/Auth/AuthService';
import {useMutation} from 'react-query';

const useAdminCertification = () => {
  const mutaions = useMutation(AuthService.certificateAdmin, {
    onError: (error: any) => {
      alert(error.response.data);
    },
  });

  return mutaions;
};

export default useAdminCertification;
