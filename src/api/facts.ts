const URL = 'https://uselessfacts.jsph.pl/random.json';

type RandomFactType = {
  id: string;
  language: string;
  permalink: string;
  source: string;
  source_url: string;
  text: string;
};

export const getRandomFact = () => {
  return fetch(URL)
    .then((res) => res.json())
    .then((res: RandomFactType) => res);
};
