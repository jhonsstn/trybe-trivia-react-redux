export const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const data = await request.json();
  return {
    token: data.token,
  };
};

export const fetchQuestion = async (token, category, difficulty, type) => {
  const URL = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}&encode=base64`;
  const request = await fetch(URL);
  const data = await request.json();
  return data.results;
};

export const fetchCategories = async () => {
  const URL = 'https://opentdb.com/api_category.php';
  const request = await fetch(URL);
  const data = await request.json();
  return data.trivia_categories;
};
