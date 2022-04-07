export const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const data = await request.json();
  return {
    token: data.token,
  };
};

export const fetchQuestion = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data.results;
};
