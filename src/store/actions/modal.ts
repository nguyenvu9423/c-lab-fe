import { createAction } from '@reduxjs/toolkit';

const showModal = createAction('showModal');
const hideModal = createAction('hideModal');

export { showModal, hideModal };
