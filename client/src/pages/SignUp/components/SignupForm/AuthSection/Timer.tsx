import {useAppDispatch} from 'hooks/Common/sotreHooks';
import {useCallback, useEffect, useRef, useState} from 'react';
import {timerStop} from 'redux/slice/auth/auth';

// 3분
const INITAL_TIME = 180;

function Timer() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const timer = useRef(INITAL_TIME);
  const timerId = useRef<number>();
  const dispatch = useAppDispatch();

  const stopTimer = useCallback(() => {
    window.clearInterval(timerId.current);
    dispatch(timerStop());
  }, [dispatch]);

  useEffect(() => {
    timerId.current = window.setInterval(() => {
      timer.current -= 1;
      setMin(Math.floor(timer.current / 60));
      setSec(timer.current % 60);
    }, 1000);
    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    if (timer.current <= 0) {
      stopTimer();
      alert('인증 시간이 초가되었습니다. 다시 이메일을 입력해주세요.');
    }
  }, [sec]);

  return (
    <div>
      <span>{convertTimerStr(min)}</span>
      <span>:</span>
      <span>{convertTimerStr(sec)}</span>
    </div>
  );
}

function convertTimerStr(time: number) {
  return `${time}`.padStart(2, '0');
}

export default Timer;
