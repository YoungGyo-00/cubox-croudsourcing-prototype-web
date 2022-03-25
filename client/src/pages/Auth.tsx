import HeaderWithoutButton from 'common/HeaderWithoutButton';
import Layout from 'common/Layout';
import useIsAuth from 'hooks/Common/useIsAuth';
import React, {useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function Auth() {
  const isAuth = useIsAuth();
  const navigate = useNavigate();
  const isFirst = useRef(true);
  const {pathname} = useLocation();

  useEffect(() => {
    if (!isFirst.current) {
      if (isAuth) {
        navigate(-1);
      } else {
        navigate('/signin');
      }
    }
    isFirst.current = false;
  }, [navigate, isAuth]);

  useEffect(() => {
    if (isAuth && pathname === '/auth') {
      navigate('/');
    }
  }, [pathname, isAuth, navigate]);
  return (
    <Layout>
      <Layout.Header>
        <HeaderWithoutButton />
      </Layout.Header>
    </Layout>
  );
}

export default Auth;
