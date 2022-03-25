import {
  isPasswordConfirmed,
  isVerifiedEmail,
  isVerifiedPassword,
} from './validator';

export type InputName = 'email' | 'password' | 'confirmPassword';

export class FormInfo {
  public displayValidationMsg = '';
  constructor(
    public name: string,
    public placeholder: string,
    private validateFn: (...value: any) => boolean,
    private validationMsg: string,
  ) {}

  setValidateMsg(...value: any) {
    if (!this.validateFn(...value)) {
      this.displayValidationMsg = this.validationMsg;
    } else {
      this.displayValidationMsg = '';
    }
  }
}

export const formInfos = {
  email: new FormInfo(
    'email',
    '이메일을 입력해주세요.',
    isVerifiedEmail,
    'email 검증 안됨',
  ),
  password: new FormInfo(
    'password',
    '비밀번호를 입력해주세요',
    isVerifiedPassword,
    'password 검증 안됨',
  ),
  // new FormInfo('nickName', '이름을 입럭해주세요'),
  confirmPassword: new FormInfo(
    'confirmPassword',
    '비밀번호 확인',
    isPasswordConfirmed,
    '비밀번호 확인 실패',
  ),
};
