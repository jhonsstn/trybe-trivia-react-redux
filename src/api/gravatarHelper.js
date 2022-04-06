import md5 from 'crypto-js/md5';

const getGravatarUrl = (getState) => {
  const hash = md5(getState().player.gravatarEmail).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export default getGravatarUrl;
