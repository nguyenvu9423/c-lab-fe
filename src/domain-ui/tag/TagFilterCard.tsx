import * as React from 'react';
import { Segment, Header, Button, Form } from 'semantic-ui-react';
import { OnlyNameTag } from '@/domains/tag';
import { TagSelect } from './inputs';

export namespace TagFilterCard {
  export interface Props {
    initialTags?: OnlyNameTag[];
    onSubmit?(tag: OnlyNameTag[]): void;
  }
}

export const TagFilterCard: React.FC<TagFilterCard.Props> = (props) => {
  const { initialTags, onSubmit } = props;
  const [tags, setTags] = React.useState<OnlyNameTag[]>(initialTags ?? []);

  return (
    <>
      <Header as="h3" attached="top">
        Lọc
      </Header>
      <Segment attached="bottom" clearing>
        <Form onSubmit={() => onSubmit?.(tags)}>
          <Form.Field>
            <label>Nhãn</label>
            <TagSelect value={tags} onChange={setTags} />
          </Form.Field>
          <Button primary floated="right" type="submit">
            Áp dụng
          </Button>
        </Form>
      </Segment>
    </>
  );
};
