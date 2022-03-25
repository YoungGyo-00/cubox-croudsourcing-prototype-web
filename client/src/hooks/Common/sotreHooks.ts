import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/slice';
import {AppDispatch} from 'redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
