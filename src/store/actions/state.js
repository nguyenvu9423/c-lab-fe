import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';

const resetState = createAction('resetState', defaultPrepare);

export { resetState };
