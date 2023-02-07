import React from 'react';

import Hint from './Hint';

const HintConcepts = () => {
  const textAuthor = '"Author" e.g. “John Smith” - author of an article.';
  const textGenre = '"Genre" e.g. "News" - identifies the journalistic genre of the article.';
  const textBrand = '"Brand" e.g. “FastFT” - identifies article that has a distinct personality or voice.';
  const textAbout = '“About" e.g. “US politics & policy”, “Donald Trump” - describes the primary subject matter of an article and the main actors identified within.';
  const textMentions = '“Mentions” e.g. “Health”, “Sean Conley”- a weaker association between an article and' +
    ' subjects and actors identified within.';
  const textKeyword = '“Keyword” - a word from an article text.';

  return (
    <Hint className="hint-concepts">
      <div className="hint-searches">
        <h3>Filter types:</h3>
        <p>{textAuthor}</p>
        <p>{textGenre}</p>
        <p>{textBrand}</p>
        <p>{textAbout}</p>
        <p>{textMentions}</p>
        <p>{textKeyword}</p>
      </div>
    </Hint>
  );
};

export default HintConcepts;
