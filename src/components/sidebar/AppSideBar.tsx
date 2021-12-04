import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/logo.svg';
import { Menu } from 'semantic-ui-react';
import { WebConfig } from '../../config';
import { LoadingState } from '../../store/common';
import { PrincipalSelectors } from '../../store/selectors';

export namespace AppSideBar {
  export interface Props {
    visible?: boolean;
    onHide?(): void;
  }
}

export const AppSideBar: React.FC<AppSideBar.Props> = (props) => {
  const { visible, onHide } = props;
  const { loadingState, principal } = useSelector(
    PrincipalSelectors.principalDataHolder()
  );
  return (
    <div
      id="sidebar"
      className={visible ? 'active' : undefined}
      onClick={onHide}
    >
      <Menu className="sidebar-menu" vertical fixed="left">
        <Menu.Item header as={Link} to="/" onClick={onHide}>
          <img
            alt="c-lab logo"
            src={Logo}
            style={{ marginRight: 4 }}
            height={32}
          />
          <span style={{ color: '#58595b' }}>{WebConfig.WebName}</span>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/articles"
          content="Bài viết"
          onClick={onHide}
        />
        <Menu.Item
          as={Link}
          to="/problems"
          content="Bài tập"
          onClick={onHide}
        />
        {LoadingState.isDone(loadingState) && !principal && (
          <Menu.Item
            as={Link}
            to="/register"
            content="Đăng kí"
            onClick={onHide}
          />
        )}
      </Menu>
    </div>
  );
};
