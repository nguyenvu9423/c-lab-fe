import * as React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { DetailedSubModal } from '@/domain-ui/submission';

export const Modal: React.FC = () => {
  const state = useSelector((state: State) => state.modal);
  if (!state) return null;
  const { type, props } = state;
  if (type === 'DETAILED_SUB') {
    return <DetailedSubModal {...props} />;
  }
  return null;
};
