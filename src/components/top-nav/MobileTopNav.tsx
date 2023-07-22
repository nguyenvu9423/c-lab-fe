import * as React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { LoginButton } from '../../pages/common';
import { LoadingState } from '../../store/common';
import { PrincipalSelectors } from '@/store/selectors';
import { SearchBar } from '../search/SearchBar';
import { UserControlMenu } from './UserControlMenu';

export namespace MobileTopNav {
  export interface Props {
    onSideBarOpen?(): void;
  }
}

export const MobileTopNav: React.FC<MobileTopNav.Props> = (props) => {
  const { loadingState, principal } = useSelector(
    PrincipalSelectors.principalDataHolder()
  );

  return (
    <Menu fixed="top" borderless>
      <Menu.Menu position="left">
        <Menu.Item icon="bars" onClick={props.onSideBarOpen} />
      </Menu.Menu>

      <Menu.Menu position="right">
        <Menu.Item style={{ flexShrink: 1 }}>
          <SearchBar />
        </Menu.Item>
        {LoadingState.isDone(loadingState) ? (
          principal ? (
            <UserControlMenu user={principal} />
          ) : (
            <Menu.Item>
              <LoginButton icon="sign in" content={undefined} />
            </Menu.Item>
          )
        ) : undefined}
      </Menu.Menu>
    </Menu>
  );
};
