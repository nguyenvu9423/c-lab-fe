import * as React from 'react';
import { useSelector } from 'react-redux';
import { DetailedSubModal } from '../../domains/submission';
import { State } from '../../store';

export const Modal: React.FC = () => {
  const state = useSelector((state: State) => state.modal);
  if (!state) return null;
  const { type, props } = state;
  if (type === 'DETAILED_SUB') {
    return <DetailedSubModal {...props} />;
  }
  return null;
};
