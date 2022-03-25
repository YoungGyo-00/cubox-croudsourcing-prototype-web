import Footer from 'common/Footer';
import Header from 'common/Header';
import Layout from 'common/Layout';
import {useAppSelector} from 'hooks/Common/sotreHooks';
import useIsAuth from 'hooks/Common/useIsAuth';
import Main from './components/Main';

function MainPage() {
  const isAuth = useIsAuth();
  const {userId} = useAppSelector(state => state.auth);

  return (
    <>
      {isAuth && (
        <Layout>
          <Layout.Header>
            <Header isAuth={isAuth} />
          </Layout.Header>
          <Layout.Main>
            <Main userId={userId!} />
          </Layout.Main>
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      )}
    </>
  );
}

export default MainPage;
