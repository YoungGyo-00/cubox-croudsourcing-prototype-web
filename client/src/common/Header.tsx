import color from 'color';
import useLogOut from 'hooks/Common/useLogOut';
import useMove from 'hooks/Common/useMove';
import {Link as RouterLink} from 'react-router-dom';
import styled, {css} from 'styled-components';
import CommonButton from './Button';

interface HeaderProps {
  isAuth: boolean;
}

function Header({isAuth}: HeaderProps) {
  const {logout} = useLogOut();

  const moveHome = useMove('/');

  const onClick = () => {
    logout();
  };

  return (
    <Wrapper>
      <Heading1 onClick={moveHome}>CUBOX Manager</Heading1>
      {isAuth ? (
        <ButtonWrapper>
          <Button onClick={onClick}>로그아웃</Button>
        </ButtonWrapper>
      ) : (
        <nav>
          <NavItems>
            <Item>
              <Link to="/certification">SignUp</Link>
            </Item>
            <Item>
              <Link to="/signin" backgroundColor={color.buttonColor}>
                SignIn
              </Link>
            </Item>
          </NavItems>
        </nav>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.header`
  display: flex;
  height: 100%;
  justify-content: space-between;
  background-color: #f3f3f3;
`;

const Button = styled(CommonButton)`
  margin: auto 0;
`;

const Heading1 = styled.h1`
  color: ${color.primary};
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
`;
const Item = styled.li`
  height: 6.25rem;
  line-height: 6.25rem;
`;

const NavItems = styled.ul`
  display: flex;
  height: 100%;
  ${Item} + ${Item} {
    margin-left: 0.625rem;
  }
`;

const Link = styled(RouterLink)<{backgroundColor?: string}>`
  text-decoration: none;
  color: ${({backgroundColor}) =>
    backgroundColor ? '#ffffff' : color.textColor};

  border: 0.0625rem solid
    ${({backgroundColor}) => (backgroundColor ? 'none' : color.textColor)};
  border-radius: 0.25rem;
  padding: 0.3125rem;
  ${props =>
    props.backgroundColor
      ? css`
          background-color: ${props.backgroundColor};
        `
      : null}
  transition: all 0.2s;
  &:hover {
    filter: brightness(0.85);
  }
`;

const ButtonWrapper = styled.div`
  width: 10%;
  display: flex;
  @media screen and (max-width: 767px) {
    width: 15%;
  }
`;

export default Header;
