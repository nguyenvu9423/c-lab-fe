import React from 'react';

import { WebConfig } from '../../config';
import { LogoSrc } from './LogoSrc';

export namespace LogoWithName {
  export interface Props {
    height?: number;
  }
}

export const LogoWithName: React.FC<LogoWithName.Props> = (props) => {
  return (
    <div className="logo-with-name">
      <img
        className="logo-image"
        src={LogoSrc}
        alt="c-lab logo"
        height={props.height ?? 32}
      />
      <span className="logo-label">{WebConfig.WebName}</span>
    </div>
  );
};
