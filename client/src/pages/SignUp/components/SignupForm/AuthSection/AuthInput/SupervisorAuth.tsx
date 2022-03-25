import {CertificateAdminRes} from 'api/Auth/authType';
import Button, {DisabledButton} from 'common/Button';
import {useAppDispatch, useAppSelector} from 'hooks/Common/sotreHooks';
import useAdminCertification from 'hooks/SignUp/useAdminCertification';
import {FormInfo} from 'pages/SignUp/utils/FormInfo';
import {isVerifiedCuboxEmail} from 'pages/SignUp/utils/validator';
import React, {useEffect, useState} from 'react';
import {
  setEmailProcessStatus,
  timerStart,
  timerStop,
} from 'redux/slice/auth/auth';
import styled from 'styled-components';
import InputCommon from '../../Input';

interface SupervisorAuthProps {
  onAuthAutority(): void;
}

const formInfo = new FormInfo(
  'cuboxEmail',
  'CUBOX 이베일을 입력하세요.',
  isVerifiedCuboxEmail,
  'cubox email 계정이 아닙니다.',
);

const numberInfo = new FormInfo(
  'number',
  '메일을 확인한 후 인증번호를 입력해주세요.',
  (num: string) => {
    return num.length === 6;
  },
  '인증번호는 6자리 입니다.',
);

const initalState = {
  email: '',
  number: '',
  emailProcess: true,
  serverNumber: 0,
};

function SupervisorAuth({onAuthAutority}: SupervisorAuthProps) {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [validationMsg, setValidationMsg] = useState('');
  const [numberValidationMsg, setNumberValidationMsg] = useState('');
  const [emailProcess, setEmailProcess] = useState(true);
  const [serverNumber, setServerNumber] = useState(0);
  const {mutate: authAdmin} = useAdminCertification();
  const [authorization, setAuthorization] = useState(false);
  const {isEmailProcess, isRunning} = useAppSelector(
    state => state.auth.roleAuth,
  );
  const dispatch = useAppDispatch();

  const onSuccess = (data: CertificateAdminRes) => {
    setServerNumber(data.certificationNumber);
    setEmailProcess(false);
    dispatch(setEmailProcessStatus({isEmailProcess: false}));
  };
  const onClick = async () => {
    authAdmin({email}, {onSuccess});
    dispatch(timerStart());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    if (name === 'cuboxEmail') {
      setEmail(value);
    } else {
      setNumber(value);
    }
  };

  useEffect(() => {
    if (isInitalizeState({isEmailProcess, isRunning})) {
      setEmail(initalState.email);
      setEmailProcess(initalState.emailProcess);
      setNumber(initalState.number);
      dispatch(setEmailProcessStatus({isEmailProcess: true}));
      dispatch(timerStop());
    }
  }, [isEmailProcess, isRunning, dispatch]);

  useEffect(() => {
    dispatch(setEmailProcessStatus({isEmailProcess: true}));
  }, [dispatch]);

  useEffect(() => {
    formInfo.setValidateMsg(email);
    setValidationMsg(formInfo.displayValidationMsg);
  }, [email]);

  useEffect(() => {
    numberInfo.setValidateMsg(number);
    setNumberValidationMsg(numberInfo.displayValidationMsg);
  }, [number]);

  useEffect(() => {
    return () => {
      dispatch(timerStop());
    };
  }, []);

  const onAuthorizationAdmin = () => {
    if (isAuthrization(serverNumber, parseInt(number))) {
      onAuthAutority();
      setAuthorization(true);
      dispatch(timerStop());
    } else {
      alert('인증번호가 틀렸습니다. 다시 확인해주세요.');
    }
  };

  return (
    <Wrapper>
      {emailProcess ? (
        <>
          <Input
            fillWidth={70}
            formInfo={formInfo}
            onChange={onChange}
            validateMessage={validationMsg}
            value={email}
          />
          <ButtonWrapper>
            {validationMsg ? (
              <DisabledButton disabled>인증하기</DisabledButton>
            ) : (
              <Button type="button" onClick={onClick}>
                인증하기
              </Button>
            )}
          </ButtonWrapper>
        </>
      ) : (
        <>
          {authorization ? (
            <div>인증이 완료되었습니다.</div>
          ) : (
            <>
              <Input
                fillWidth={70}
                formInfo={numberInfo}
                onChange={onChange}
                validateMessage={numberValidationMsg}
                value={number}
              />
              <ButtonWrapper>
                {numberValidationMsg ? (
                  <DisabledButton disabled>인증하기</DisabledButton>
                ) : (
                  <Button type="button" onClick={onAuthorizationAdmin}>
                    인증하기
                  </Button>
                )}
              </ButtonWrapper>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled(InputCommon)`
  width: 70%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 15%;
`;

function isAuthrization(serverNumber: number, clientNumber: number) {
  return serverNumber === clientNumber;
}

function isInitalizeState({
  isEmailProcess,
  isRunning,
}: {
  isEmailProcess: boolean;
  isRunning: boolean;
}) {
  return !isEmailProcess && !isRunning;
}

export default SupervisorAuth;
