import {AxiosError} from 'axios';
import {useCallback, useState} from 'react';
import {InitialState} from 'utils/reduxUtils';

function useClickApi<Res, P>(fetchFunc: (p: P) => Promise<Res>) {
  const initialState: InitialState<Res> = {
    data: null,
    loading: false,
    error: null,
  };

  const [state, setState] = useState(initialState);

  const onClick = useCallback((param: P) => {
    setState({
      ...state,
      loading: true,
    });
    fetchFunc(param)
      .then(data =>
        setState({
          ...state,
          loading: false,
          data,
        }),
      )
      .catch((error: AxiosError) => {
        setState({
          ...state,
          loading: false,
          error,
        });
      });
  }, []);

  return {...state, onClick};
}

export default useClickApi;
