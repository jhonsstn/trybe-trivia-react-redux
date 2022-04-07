import { MD5 } from 'crypto-js';

const getGravatarUrl = (getState) => {
  const hash = MD5(getState().player.gravatarEmail).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export default getGravatarUrl;
