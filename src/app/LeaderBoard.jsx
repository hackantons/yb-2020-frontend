import React from 'react';
import { getLeaderboard } from '../utils/api';
import './LeaderBoard.css';

const LeaderBoard = ({ value }) => {
  const [leaders, setLeaders] = React.useState([]);
  React.useEffect(() => {
    getLeaderboard.then(payload => {
      setLeaders(payload.data);
    });
  }, []);
  return (
    <div>
      <img className="logo" src={`/assets/static/logo.svg`} alt="bekb logo" />
      <p>
        {leaders
          .sort(function(a, b) {
            return a.score > b.score;
          })
          .map((leader, i) => {
            return (
              <p className="leaders">
                <span className="leader-position">{i + 1}</span>{' '}
                <span className="leader-name">{leader.name}</span>
                <span className="leader-score">{leader.score}$</span>
              </p>
            );
          })}
      </p>
    </div>
  );
};

export default LeaderBoard;
