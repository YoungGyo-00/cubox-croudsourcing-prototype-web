import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({children}: LayoutProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  @media screen and (min-width: 1024px) {
    width: 1023px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 767px;
  }
  @media screen and (max-width: 767px) {
    width: 500px;
  }
`;

Layout.Header = styled.header`
  height: 6.25rem;
  background-color: inherit;
`;

Layout.Main = styled.main`
  position: relative;
  min-height: calc(100vh - 10.25rem);
`;

Layout.Footer = styled.footer`
  margin-top: auto;
`;

export default Layout;
