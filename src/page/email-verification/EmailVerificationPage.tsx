import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import { useScrollToTop } from '../../common/hooks';
import { ErrorMessage, LoadingIndicator } from '../../components';
import { EmailVerificationService } from '../../service/EmailVerificationService';
import { AuthenticationSelectors } from '../../store/selectors';
import { PageErrorMessage } from '../shared';
import { UnknownException } from '../../exception';

type Result = { error?: false } | { error: true; message: string };

export const EmailVerificationPage: React.FC = () => {
  useScrollToTop();
  const { id } = useParams();
  if (!id) {
    throw UnknownException.createDefault();
  }

  const navigate = useNavigate();
  const [result, setResult] = React.useState<Result | undefined>();
  const isAuthenticated = useSelector(
    AuthenticationSelectors.isAuthenticated()
  );

  React.useEffect(() => {
    if (id && typeof id === 'string') {
      EmailVerificationService.verify(id)
        .then(() => {
          setResult({});
        })
        .catch((e) => {
          setResult({ error: true, message: e.message });
        });
    }
  }, [id]);

  if (!id) {
    return (
      <PageErrorMessage message="Yêu cầu xác nhận email không tồn tại hoặc đã hết hạn" />
    );
  }

  if (!result) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Helmet>
        <title>Xác nhận email</title>
      </Helmet>
      <Grid container>
        <Grid.Row centered>
          <Grid.Column style={{ maxWidth: 420 }}>
            {!result.error ? (
              <Segment color="green">
                <Header content="Xác nhận email" />
                <p>Email của bạn đã được xác nhận thành công</p>
                {isAuthenticated && (
                  <>
                    <p>
                      <strong>Lưu ý: </strong> Bạn cần đăng nhập lại để nhận
                      được sự thay đổi.
                    </p>
                    <Button
                      content="Log out"
                      onClick={() => navigate('/logout')}
                    />
                  </>
                )}
              </Segment>
            ) : (
              <ErrorMessage message={result.message} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
