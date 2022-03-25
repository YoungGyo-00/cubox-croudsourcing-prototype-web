import {useNavigate} from 'react-router-dom';

const useMove = (path: string) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(path);
  };

  return onClick;
};

export default useMove;
