import React from 'react';
import TweetsWrapper from '../RapidSearch/TweetsWrapper';
export default function ViewTargetTweets(props) {
  const [state, setState] = React.useState(props.location.state);

  return (
    <div className="row bg-dark h-100">
      {state.tweets.map((tweet, index) => (
        <TweetsWrapper key={tweet.id} index={index} tweet={tweet} />
      ))}
    </div>
  );
}
