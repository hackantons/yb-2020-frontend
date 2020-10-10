import React from 'react';
import { getLeaderboard } from '../utils/api';

import { ShadowBox, Button } from '../theme';

import './LeaderBoard.css';

const LeaderBoard = ({ value }) => {
  const formattedValue = React.useMemo(() => Math.round(value), [value]);
  const [leaders, setLeaders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [shadowBox, setShadowBox] = React.useState(false);
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    getLeaderboard.then(payload => {
      setLoading(false);
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

  const leaderboard = React.useMemo(
    () =>
      leaders
        .map(({ name, score, you = false }) => ({
          name,
          score: Math.round(score),
          you,
        }))
        .sort((a, b) => b.score - a.score),
    [leaders]
  );

  const myPosition = React.useMemo(
    () => leaderboard.findIndex(e => e.you) + 1,
    [leaderboard]
  );

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
      {loading ? (
        <p style={{ marginTop: '100px', textAlign: 'center' }}>loading..</p>
      ) : (
        <React.Fragment>
          <p className="leaderboard__cta">
            Du hast mit {formattedValue}.- Platz {myPosition} erreicht.{' '}
            {myPosition >= 6 ? (
              <React.Fragment>
                Da ist noch etwas Verbesserungsbedarf. Wenn du dich mal mit
                einem Profi unerhalten möchtest,{' '}
                <a target="_blank" href="https://www.bekb.ch/services/beratung">
                  melde dich bei uns.
                </a>
              </React.Fragment>
            ) : (
              <React.Fragment>
                WOW! Das ist beeindruckend. Wenn du dich mal mit anderen Profis
                unterhalten möchtest,{' '}
                <a target="_blank" href="https://www.bekb.ch/services/beratung">
                  melde dich bei uns.
                </a>
              </React.Fragment>
            )}
          </p>
          <h3 className="leaderboard__top5">Top 5</h3>
          <table className="leaderboard__table" cellSpacing="0">
            {leaderboard.slice(0, 5).map(({ name, score, you = false }, i) => (
              <tr>
                <td>{i + 1}</td>
                <td className={you ? 'leaderboard__leader-you' : ''}>{name}</td>
                <td>{score}.-</td>
              </tr>
            ))}
          </table>
          <Button onClick={() => setShadowBox(true)}>
            Spielstand speichern
          </Button>
          <Button
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Spiel neu starten
          </Button>
        </React.Fragment>
      )}
      {shadowBox && (
        <ShadowBox close={() => setShadowBox(false)}>
          <p>Spielstand: {formattedValue}.-</p>
          <label for="name">name</label>
          <input
            id="name"
            name="name"
            type="text"
            onInput={e => setName(e.target.value)}
          />
          <Button
            onClick={() => {
              if (name === '') {
                alert('Bitte gib einen Namen ein');
              } else {
                console.log('SEND THIS', name, formattedValue);
              }
            }}
          >
            Absenden
          </Button>
        </ShadowBox>
      )}
    </div>
  );
};

export default LeaderBoard;
