import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
import { AuthenticationService } from '@/services/auth';
import { login } from '@/store/actions';
import { AuthenticationSelectors } from '@/store/selectors';
import { AuthRequest } from '@/domains/auth';

export const AuthorizedPage: React.FC = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authorized = useSelector(AuthenticationSelectors.isAuthenticated());
  const [params] = useSearchParams();

  const rawRequest = sessionStorage.getItem('authRequest');

  const authCode = params.get('code');

  React.useEffect(
    () => console.log('did mount', window.location.pathname, props),
    [],
  );

  React.useEffect(() => {
    if (authorized) {
      setTimeout(() => navigate('/'), 2000);
      return;
    }

    if (!authCode || !rawRequest) return;

    const authRequest: AuthRequest = JSON.parse(rawRequest);

    AuthenticationService.authorize(authCode, authRequest.codeVerifier)
      .then((response) => {
        dispatch(login(response.data));
        console.log(authRequest.redirectUrl);
        setTimeout(() => {
          navigate(authRequest.redirectUrl);
        }, 2000);
      })
      .finally(() => {
        sessionStorage.removeItem('authRequest');
      });
    return () => console.log('unmount');
  }, [dispatch, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {!authorized ? (
        <Loader active>Đăng nhập...</Loader>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Icon name="check" size="big" color="green" />
          <span style={{ marginTop: 16 }}>
            Đăng nhập thành công. Điều hướng...
          </span>
        </div>
      )}
    </div>
  );
};
