import React from 'react';
import {useLocation} from 'react-router-dom';

function Project() {
  const {
    state: {centerId, projectStatus},
  } = useLocation() as {state: {centerId: string; projectStatus: string}};
  console.log(centerId, projectStatus);
  return <div>Project</div>;
}

export default Project;
