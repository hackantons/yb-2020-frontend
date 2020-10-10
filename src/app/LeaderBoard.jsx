import React from 'react';
import { getLeaderboard } from '../utils/api';
import './LeaderBoard.css';

const LeaderBoard = ({ value }) => {
  const formattedValue = React.useMemo(() => Math.round(value), [value]);
  const [leaders, setLeaders] = React.useState([]);
  React.useEffect(() => {
    getLeaderboard.then(payload => {
      setLeaders([
        ...payload.data,
        {
          name: 'DU',
          score: formattedValue,
          you: true,
        },
      ]);
    });
  }, []);

  return (
    <div className="leaderboard">
      <div className="leaderboard__header">
        <img
          className="leaderboard__logo"
          src={`/assets/static/logo.svg`}
          alt="bekb logo"
        />
        <div className="leaderboard__title">Leaderboard</div>
      </div>
      <table className="leaderboard__table" cellspacing="0">
        {leaders
          .map(leader => ({ ...leader, score: Math.round(leader.score) }))
          .sort((a, b) => b.score - a.score)
          .map(({ name, score, you = false }, i) => (
            <tr>
              <td>{i + 1}</td>
              <td className={you ? 'leaderboard__leader-you' : ''}>{name}</td>
              <td>{score}.-</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default LeaderBoard;
