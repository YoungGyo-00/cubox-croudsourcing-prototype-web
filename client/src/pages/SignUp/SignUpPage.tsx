import {CertificationRes} from 'api/Auth/authType';
import Footer from 'common/Footer';
import HeaderWithoutButton from 'common/HeaderWithoutButton';
import Layout from 'common/Layout';
import useIsCertification from 'hooks/SignUp/useIsCertification';
import {useLocation} from 'react-router-dom';
import SignupForm from './components/SignupForm/SignupForm';

function SignUpPage() {
  useIsCertification();
  const location = useLocation();
  if (location.state == null) {
    return null;
  }
  const {unique_key, name, age, foreigner} = location.state as CertificationRes;

  return (
    <Layout>
      <Layout.Header>
        <HeaderWithoutButton />
      </Layout.Header>
      <Layout.Main>
        <SignupForm
          unique_key={unique_key}
          name={name}
          age={age}
          foreigner={foreigner}
        />
      </Layout.Main>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default SignUpPage;
