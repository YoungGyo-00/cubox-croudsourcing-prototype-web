import Header from 'common/Header';
import Layout from 'common/Layout';
import useIsAuth from 'hooks/Common/useIsAuth';
import {useParams} from 'react-router-dom';
import SectionWrapper from './components/SectionWrapper';

function CenterDetailPage() {
  const {centerId} = useParams<{centerId: string}>();
  const isAuth = useIsAuth();

  return (
    <Layout>
      <Layout.Header>
        <Header isAuth={isAuth} />
      </Layout.Header>
      <Layout.Main>
        <SectionWrapper centerId={centerId!} />
      </Layout.Main>
    </Layout>
  );
}

export default CenterDetailPage;
