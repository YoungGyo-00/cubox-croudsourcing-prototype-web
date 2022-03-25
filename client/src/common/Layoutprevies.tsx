import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({children}: LayoutProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  width: 75rem;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
`;

Layout.Header = styled.div`
  height: 6.25rem;
`;

Layout.Main = styled.main`
  height: 100%;
`;

Layout.AuthMain = styled.main`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

Layout.Footer = styled.div`
  margin-top: auto;
`;

export default Layout;
