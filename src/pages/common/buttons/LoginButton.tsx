import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import { AuthenticationService } from '@/services/auth';
import { AuthRequest } from '@/domains/auth';
import { PkceUtils } from '@/utils/Pkce';

export const LoginButton: React.FC<ButtonProps> = (props) => {
  const handleClick = React.useCallback(() => {
    const currentUrl = window.location.pathname;
    const request: AuthRequest = {
      codeVerifier: PkceUtils.generateCodeVerifier(),
      redirectUrl: shouldGoBack(currentUrl) ? currentUrl : '/',
    };
    sessionStorage.setItem('authRequest', JSON.stringify(request));
    AuthenticationService.login(request.codeVerifier);
  }, []);

  return <Button content="Đăng nhập" {...props} onClick={handleClick} />;
};

function shouldGoBack(url: string) {
  return !(
    url.startsWith('/logout') ||
    url.startsWith('/email-verification') ||
    url.startsWith('/reset-password')
  );
}
