import { serverConfigs } from './server-config';

export const serverPath = {
  resolve(url) {
    if (url.charAt(0) === '/') {
      return serverConfigs.getBaseURL() + url;
    } else {
      return `${serverConfigs.getBaseURL()}/${url}`;
    }
  },
};
