export const defaultPayloadCreators = payload => payload;
export const defaultMetaCreators = (payload, meta) => meta;
export const defaultCreators = [defaultPayloadCreators, defaultMetaCreators];

export const defaultPrepare = (payload, meta) => ({ payload, meta });
