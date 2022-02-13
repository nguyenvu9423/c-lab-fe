import * as React from 'react';
import { Container, Header, Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { WebConfig } from '../../config';

export const HomePage: React.FC = () => {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <Header
          as="h1"
          content={`Chào bạn đến với ${WebConfig.WebName}!`}
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            textAlign: 'center',
          }}
        />
        <Header
          as="h2"
          content="          
              Đây là nơi bạn có thể học thêm những kiến thức về thuật
              toán và rèn luyện kĩ năng giải thuật của mình
            "
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
            textAlign: 'center',
          }}
        />

        <Card.Group style={{ justifyContent: 'center', marginTop: '1.5em' }}>
          <Card as={Link} to="/articles" color="green">
            <Card.Content>
              <Card.Header>
                Bài viết
                <Button floated="right" icon="arrow right" size="mini" />
              </Card.Header>
            </Card.Content>
            <Card.Content description="Trang tổng hợp các bài viết về thuật toán và cấu trúc dữ liệu" />
          </Card>
          <Card as={Link} to="/problems" color="green">
            <Card.Content>
              <Card.Header>
                Bài tập
                <Button floated="right" icon="arrow right" size="mini" />
              </Card.Header>
            </Card.Content>
            <Card.Content description="Trang tổng hợp các bài tập về thuật toán. Bạn có thể nộp bài và xem kết quả lập tức" />
          </Card>
          <Card as={Link} to="/intro" color="green">
            <Card.Content>
              <Card.Header>
                Giới thiệu
                <Button floated="right" icon="arrow right" size="mini" />
              </Card.Header>
            </Card.Content>
            <Card.Content description="Trang giới thiệu về c-lab và hướng dẫn dành cho những bạn mới" />
          </Card>
        </Card.Group>
      </div>
    </Container>
  );
};
