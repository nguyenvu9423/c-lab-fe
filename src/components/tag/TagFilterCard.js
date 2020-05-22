import * as React from 'react';
import { Segment, Header, Dropdown, Button, Form } from 'semantic-ui-react';
import { useTagSelect } from '../../domains/tag';
import { useDispatch } from 'react-redux';
import { applyFilters, resetFilters } from '../../store/actions/filter';
import { Operation } from '../../utility/filter/Operation';

export function TagFilterCard({ target }) {
  const dispatch = useDispatch();
  const [tags, setTags] = React.useState([]);
  const {
    tagOptions,
    mapTagToValue,
    mapValueToTag,
    isFetchingTags,
    handleTagSearchChange
  } = useTagSelect();

  const handleApply = React.useCallback(() => {
    dispatch(
      applyFilters(
        [
          {
            key: 'tags',
            operator: Operation.CONTAIN.operator,
            value: tags.map(({ id }) => id).join(',')
          }
        ],
        { target }
      )
    );
  }, [tags]);

  const handleClearAll = React.useCallback(() => {
    setTags([]);
    if (tags.length !== 0) dispatch(resetFilters({ target }));
  });

  return (
    <>
      <Header as="h3" attached="top">
        Fitler
      </Header>
      <Segment attached="bottom" className={'clear-fix-container'}>
        <Form onSubmit={handleApply}>
          <Form.Field>
            <label>Tags</label>
            <Dropdown
              selection
              multiple
              search
              fluid
              loading={isFetchingTags}
              value={tags.map(mapTagToValue)}
              options={tagOptions}
              onSearchChange={(event, { searchQuery }) => {
                handleTagSearchChange(searchQuery);
              }}
              onChange={(event, data) => {
                setTags(data.value.map(mapValueToTag));
              }}
            />
          </Form.Field>
          <Button primary floated="right" type="submit">
            Apply
          </Button>
          <Button floated="right" type="button" onClick={handleClearAll}>
            Clear all
          </Button>
        </Form>
      </Segment>
    </>
  );
}
