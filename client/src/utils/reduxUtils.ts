import {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {isEmptyObj} from './typeCheck';

export interface InitialState<S> {
  loading: boolean;
  data: S | null;
  error: SerializedError | null;
}

export interface InitialStateById<S> {
  [key: string]: InitialState<S>;
}

export function getInitialState<T>(): InitialState<T> {
  return {
    loading: false,
    data: null,
    error: null,
  };
}

type FetchThunkDataConstructor<T, S, Req> = {
  fetch: AsyncThunk<T, Req, {}>;
  keep: boolean;
  key: string;
  handler?: (state: S, action: PayloadAction<T>) => void;
};

export class FetchThunkData<
  T,
  S extends {[key: string]: InitialState<T>},
  StateById extends {[key: string]: InitialStateById<T>},
  R,
> {
  private fetch: AsyncThunk<T, R, {}>;
  private keep: boolean;
  private key: string;
  private handler?: (state: S | StateById, action: PayloadAction<T>) => void;

  constructor({
    fetch,
    keep,
    key,
    handler,
  }: FetchThunkDataConstructor<T, S | StateById, R>) {
    this.fetch = fetch;
    this.keep = keep;
    this.key = key;
    this.handler = handler;
  }

  private initializePendingById = (state: StateById, arg: string) => {
    state[this.key][arg] = {
      data: null,
      loading: true,
      error: null,
    };
  };

  private pendingReducer = (state: S) => {
    state[this.key].data = this.keep ? state[this.key].data : null;
    state[this.key].loading = true;
    state[this.key].error = null;
  };

  private pendingReducerById = (
    state: StateById,
    action: PayloadAction<T, string, {arg: string}>,
  ) => {
    if (isEmptyObj(state[this.key])) {
      this.initializePendingById(state, action.meta.arg);
    }
    state[this.key][action.meta.arg] = {
      data: this.keep
        ? state[this.key][action.meta.arg] &&
          state[this.key][action.meta.arg].data
        : null,
      loading: true,
      error: null,
    };
  };

  private fulfilledReducer = (state: S, action: PayloadAction<T>) => {
    state[this.key].loading = false;
    state[this.key].data = action.payload;
    this.handler && this.handler(state, action);
  };

  private fulfilledReducerById = (
    state: StateById,
    action: PayloadAction<T, string, {arg: string}>,
  ) => {
    state[this.key][action.meta.arg].loading = false;
    state[this.key][action.meta.arg].data = action.payload;
    this.handler && this.handler(state, action);
  };

  private rejectedReducer = (
    state: S,
    action: PayloadAction<T, string, {arg: string}, SerializedError>,
  ) => {
    state[this.key].loading = false;
    state[this.key].error = action.payload;
  };

  private rejectedReducerById = (
    state: StateById,
    action: PayloadAction<T, string, {arg: string}, SerializedError>,
  ) => {
    state[this.key][action.meta.arg].loading = false;
    state[this.key][action.meta.arg].error = action.payload;
  };

  getFetchThunkReducer(builder: ActionReducerMapBuilder<any>) {
    const pending = builder.addCase(
      this.fetch.pending.type,
      this.pendingReducer,
    );
    const fulfilled = builder.addCase(
      this.fetch.fulfilled.type,
      this.fulfilledReducer,
    );
    const rejected = builder.addCase(
      this.fetch.rejected.type,
      this.rejectedReducer,
    );
    return {
      ...pending,
      ...fulfilled,
      ...rejected,
    };
  }

  getFetchThunkReducerById(builder: ActionReducerMapBuilder<any>) {
    const pending = builder.addCase(
      this.fetch.pending.type,
      this.pendingReducerById,
    );
    const fulfilled = builder.addCase(
      this.fetch.fulfilled.type,
      this.fulfilledReducerById,
    );
    const rejected = builder.addCase(
      this.fetch.rejected.type,
      this.rejectedReducerById,
    );
    return {
      ...pending,
      ...fulfilled,
      ...rejected,
    };
  }
}
