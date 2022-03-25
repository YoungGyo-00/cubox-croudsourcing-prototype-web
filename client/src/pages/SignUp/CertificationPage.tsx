import Footer from 'common/Footer';
import HeaderWithoutButton from 'common/HeaderWithoutButton';
import Layout from 'common/Layout';
import CertificationMain from './components/CertificationMain';

function CertificationPage() {
  return (
    <Layout>
      <Layout.Header>
        <HeaderWithoutButton />
      </Layout.Header>
      <Layout.Main>
        <CertificationMain />
      </Layout.Main>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default CertificationPage;
