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
          {
            '**c-lab** là một trang web có thể giúp bạn học các kiến thức về lập \
          trình và giải thuật qua các bài viết và bài tập về thuật toán. Ngoài \
          việc học lý thuyết, với mỗi bài tập bạn có thể nộp bài làm của mình và \
          được chấm trực tiếp. Bạn cũng có thể theo dõi trạng thái và kết quả \
          củ bài chấm ngay tức thì. Để biết thêm chi tiết về cách nộp bài, vui \
          lòng xem trang [Hướng dẫn](/info/guide)\
          \n\n **Lưu ý**: trang web hiện đang chạy phiên bản thử nghiệm nên không khỏi những sai sót. Mọi ý kiến đóng góp xin vui lòng gửi về : \
          \n\n <i aria-hidden="true" class="mail icon"></i>: [clabteam2021@gmail.com](mailto:clabteam2021@gmail.com) \
          \n \n <i aria-hidden="true" class="facebook icon"></i>: [Vu Tran](https://www.facebook.com/nguyenvu9405)'
          }
        </MarkdownView>
      </Segment>
    </>
  );
};
