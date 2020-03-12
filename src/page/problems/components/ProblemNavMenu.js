import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export function ProblemNavMenu({ rootUrl, tabName }) {
  const history = useHistory();
  const handleMenuItemClicked = React.useCallback(
    (event, { name }) => {
      if (!name) {
        history.push(rootUrl);
      } else {
        history.push(`${rootUrl}/${name}`);
      }
    },
    [history, rootUrl]
  );
  return (
    <Menu pointing secondary attached="top">
      <Menu.Item
        name=""
        active={tabName == undefined}
        link
        onClick={handleMenuItemClicked}
      >
        Content
      </Menu.Item>
      <Menu.Item
        name="submit"
        link
        active={tabName == 'submit'}
        onClick={handleMenuItemClicked}
      />
      <Menu.Item
        name="status"
        link
        active={tabName == 'status'}
        onClick={handleMenuItemClicked}
      />
    </Menu>
  );
}
