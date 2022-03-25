import {AxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';

type InitialState<T> = {
  data: null | T;
  loading: boolean;
  error: null | AxiosError;
};

function useFetch<Res, P>(param: P, fetchFunc: (p: P) => Promise<Res>) {
  const initalState: InitialState<Res> = {
    data: null,
    loading: false,
    error: null,
  };

  const [state, setState] = useState(initalState);

  const fetch = useCallback(() => {
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
  }, [fetchFunc, param]);

  useEffect(() => {
    fetch();
  }, []);

  return {...state, fetch, setState};
}

export default useFetch;
