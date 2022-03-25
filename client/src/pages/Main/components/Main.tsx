import {useQuery} from 'react-query';
import styled from 'styled-components';
import CenterCard from './CenterCard/CenterCard';
import SupervisorService from 'api/Supervisor/SupervisorService';
import Loading from 'common/Loading';
import NoCenterMain from './NoCenterMain';

interface MainProps {
  userId: string;
}

function Main({userId}: MainProps) {
  const {
    data: centers,
    error,
    isLoading,
  } = useQuery(['centers', userId], () =>
    SupervisorService.getCenterInfoByUserId({userId}),
  );

  if (error) {
    alert((error as any).response.data);
  }

  if (isLoading && !centers) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {centers && centers.length !== 0 ? (
        centers.map(centerInfo => (
          <CenterCard
            center={centerInfo.center}
            projects={centerInfo.project}
            key={centerInfo.center.centerId}
          />
        ))
      ) : (
        <NoCenterMain />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export default Main;
