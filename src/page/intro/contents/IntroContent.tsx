import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { MarkdownView } from '../../../components';

export const IntroContent: React.FC = () => {
  return (
    <>
      <Header as="h3" attached="top">
        Giới thiệu
      </Header>
      <Segment attached="bottom">
        <MarkdownView>
          **c-lab** là một trang web có thể giúp bạn học các kiến thức về lập
          trình và giải thuật qua các bài viết và bài tập về thuật toán. Ngoài
          ra với mỗi bài tập, bạn có thể nộp bài làm của mình và được chấm trực
          tiếp. Bạn cũng có thể theo dõi trạng thái và kết quả của bài chấm. Để
          biết thêm chi tiết về cách nộp bài, vui lòng xem trang [Hướng
          dẫn](/intro/guide)
        </MarkdownView>
      </Segment>
    </>
  );
};
