import * as React from 'react';
import { Segment, Header, Button, Form } from 'semantic-ui-react';
import { TagSelect, Tag } from '../../domains/tag';

export const TagFilterCard: React.FC<{ onSubmit?(tag: Tag[]): void }> = (
  props
) => {
  const { onSubmit } = props;
  const [tags, setTags] = React.useState([]);

  return (
    <>
      <Header as="h3" attached="top">
        Fitler
      </Header>
      <Segment attached="bottom" clearing>
        <Form onSubmit={() => onSubmit?.(tags)}>
          <Form.Field>
            <label>Tags</label>
            <TagSelect value={tags} onChange={setTags} />
          </Form.Field>
          <Button primary floated="right" type="submit">
            Apply
          </Button>
        </Form>
      </Segment>
    </>
  );
};
