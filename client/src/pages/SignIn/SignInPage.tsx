import Footer from 'common/Footer';
import HeaderWithoutButton from 'common/HeaderWithoutButton';
import Layout from 'common/Layout';
import {useAppSelector} from 'hooks/Common/sotreHooks';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from './components/Form';

function SignInPage() {
  const {isAuth} = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate(-1);
    }
  }, [isAuth, navigate]);
  return (
    <Layout>
      <Layout.Header>
        <HeaderWithoutButton />
      </Layout.Header>
      <Layout.Main>
        <Form />
      </Layout.Main>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default SignInPage;
