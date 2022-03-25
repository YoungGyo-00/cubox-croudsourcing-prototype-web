import styled from 'styled-components';

function Footer() {
  return (
    <Wrapper>
      <Title>CUBOX</Title>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  height: 4rem;
  text-align: center;
  background-color: #f3f3f3;
`;

const Title = styled.span`
  background-color: #f3f3f3;
`;

export default Footer;
