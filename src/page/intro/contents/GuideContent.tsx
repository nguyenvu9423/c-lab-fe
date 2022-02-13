import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { MarkdownView } from '../../../components';

export const GuideContent: React.FC = () => {
  return (
    <>
      <Header as="h3" attached="top">
        Hướng dẫn
      </Header>
      <Segment attached="bottom">
        <MarkdownView>
          {
            '### Nộp bài \
            \n\n Để nộp bài code của mình, điều duy nhất bạn cần làm là tạo một tài khoản và xác nhận email. Sau đó, chọn bài và bắt đầu làm. Bạn có thể nộp bài với 2 loại ngôn ngữ C++ và Pascal. \
            \n\n ### Chấm bài \
            \n Mỗi bài nộp sẽ được chạy qua các tests được cung cấp bởi người tạo bài. Bài nộp sẽ được chấm theo một trong 2 hình thức chấm bài khác nhau là ACM và OI: \
            \n -	ACM: bài nộp của bạn cần phải chạy đúng hết tất cả các test để được coi là đúng. Sai một test sẽ được coi là sai cả bài. \
            \n -	OI: bài nộp của bạn sẽ được cho điểm theo những tests bài chạy đúng. Đúng test nào bạn sẽ có điểm của test đó. \
            \n\n Kết quả của mỗi test có thể thuộc những loại sau: \
            \n -	Accepted: bài nộp chạy ra kết quả đúng \
            \n - TLE (Time limit exceeded): bài nộp chạy quá thời gian của đề bài \
            \n - MLE (Memory limit exceeded): bài nộp quá bộ nhớ cho phép \
            \n - OLE (Output limit exceeded): bài nộp in ra dữ liệu vượt mức cho phép \
            \n - RE (Runtime error): bài nộp chạy lỗi - exit với code khác 0 \
            \n\n Với mỗi test, bài nộp được coi là đúng và có điểm của test đó chỉ khi đạt được kết quả Accepted. Ngược lại thì ko có điểm. \
            '
          }
        </MarkdownView>
      </Segment>
    </>
  );
};
