import * as React from 'react';
import { Container, Header, Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { WebConfig } from '../../config';

export const HomePage: React.FC = () => {
  return (
    <Container>
      <div
        style={{
          paddingTop: '12em',
          paddingBottom: '12em',
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
              toán và rèn luyện kĩ năng giải thuật của mình thông qua những bài
              tập được chấm tự động
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
            <Card.Content description="Trang tổng hợp các bài viết về kiến thức thuật toán" />
          </Card>
          <Card as={Link} to="/problems" color="green">
            <Card.Content>
              <Card.Header>
                Bài tập
                <Button floated="right" icon="arrow right" size="mini" />
              </Card.Header>
            </Card.Content>
            <Card.Content description="Nơi tổng hợp các bài tập về thuật toán. Bạn có thể nộp bài và xem kết quả bài nộp" />
          </Card>
          <Card as={Link} to="/problems" color="green">
            <Card.Content>
              <Card.Header>
                Giới thiệu
                <Button floated="right" icon="arrow right" size="mini" />
              </Card.Header>
            </Card.Content>
            <Card.Content description="Nơi tổng hợp các bài tập về thuật toán. Bạn có thể nộp bài và xem kết quả bài nộp" />
          </Card>
        </Card.Group>
      </div>
    </Container>
  );
};
