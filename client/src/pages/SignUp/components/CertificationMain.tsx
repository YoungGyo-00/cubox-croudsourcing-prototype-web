import Button from 'common/Button';
import useCertification from 'hooks/SignUp/useCertification';
import styled from 'styled-components';

function CertificationMain() {
  const certification = useCertification();

  const onClick = () => {
    try {
      certification();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Wrapper>
      <Title>본인인증</Title>
      <Description>
        회원님의 소중한 개인정보 보호를 위하여 휴대폰 본인인증을 진행하고
        있습니다.
      </Description>
      <Button onClick={onClick}>본인인증</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  font-size: 1.875rem;
`;

const Description = styled.p`
  color: gray;
  margin: 1.25rem 6.25rem;
  word-break: keep-all;
  line-height: 1.5;
`;

export default CertificationMain;
