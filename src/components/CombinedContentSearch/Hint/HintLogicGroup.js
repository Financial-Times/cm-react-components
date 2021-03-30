import React from 'react';

import Hint from './Hint';

const HintLogicGroup = () => {
  const textAND = '“AND” e.g. Apple AND Microsoft - both terms must be present in an article to include this article in the feed.';
  const textOR = '“OR” e.g. Apple OR Microsoft - at least one of the terms must be present in an article to include this article in the feed.';
  const textAddALine = '"Add a new line" - Adds new filter';
  const textAddAGroup = '"Add new group" - Adds subexpression';
  const textInsertAGroup = '"Insert in a group" - Inserts the current expression as a subexpression';
  const textRemoveGroup = '"Remove this group" - Removes the subexpression';

  return (
    <Hint>
      <div className="hint-searches">
        <h3>Logical operators:</h3>
        <p>{textAND}</p>
        <p>{textOR}</p>
        <h3>Operations:</h3>
        <p>{textAddALine}</p>
        <p>{textAddAGroup}</p>
        <p>{textInsertAGroup}</p>
        <p>{textRemoveGroup}</p>
      </div>
    </Hint>
  );
};

export default HintLogicGroup;
