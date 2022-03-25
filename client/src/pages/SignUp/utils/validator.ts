const emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const cuboxEmailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@cubox.aero/i;

// 최소 8 자, 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상 :
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

export function isVerifiedEmail(email: string) {
  return email.match(emailRegExp) != null;
}

export function isVerifiedCuboxEmail(email: string) {
  return email.match(cuboxEmailRegExp) != null;
}

export function isPasswordConfirmed(password: string, confirmPassword: string) {
  return password === confirmPassword && confirmPassword !== '';
}

export function isVerifiedPassword(password: string) {
  return password.match(passwordRegExp) != null;
}

export function isVerifiedName(name: string) {
  return name.length !== 0;
}
