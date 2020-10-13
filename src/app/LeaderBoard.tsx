import React from 'react';
import useOnlineStatus from '@rehooks/online-status';
import { getLeaderboard } from '@utils/api';

import { ShadowBox, Button } from '@theme';

import './LeaderBoard.css';
import axios from 'axios';

const LeaderBoard = ({ value, className = '' }) => {
  const formattedValue = React.useMemo(() => Math.round(value), [value]);
  const [leaders, setLeaders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [shadowBox, setShadowBox] = React.useState(false);
  const [name, setName] = React.useState('');
  const onlineStatus = useOnlineStatus();

  React.useEffect(() => {
    getLeaderboard().then(payload => {
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
    <div className={`${className} leaderboard`}>
      <div className="leaderboard__header">
        <img
          className="leaderboard__logo"
          src={`/assets/static/logo.svg`}
          alt="bekb logo"
        />
        <div className="leaderboard__title">Leaderboard</div>
      </div>
      {!onlineStatus ? (
        <p style={{ marginTop: '100px', textAlign: 'center' }}>
          Das Leaderboard kann leider offline nicht angezeigt werden.
          <br />
          Aber zum Glück treffen sich unsere Experten auch offline gerne mit
          dir: 031 666 18 80
        </p>
      ) : (
        <React.Fragment>
          {loading ? (
            <p style={{ marginTop: '100px', textAlign: 'center' }}>loading..</p>
          ) : (
            <React.Fragment>
              <p className="leaderboard__cta">
                <div className="leaderboard__rank">
                  Du hast mit{' '}
                  <span className="total">
                    {formattedValue.toLocaleString()} CHF
                  </span>
                  <h2>Platz {myPosition}</h2> erreicht.{' '}
                </div>
                {myPosition >= 6 ? (
                  <React.Fragment>
                    Da ist wohl noch etwas Verbesserungsbedarf. <br />
                    Mit echtem Geld braucht es mehr Wissen und dabei helfen
                    unsere Profis dir gerne:{' '}
                    <a
                      class="leaderboard__advice"
                      target="_blank"
                      href="https://www.bekb.ch/services/beratung"
                    >
                      Beratung BEKB
                    </a>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    WOW! Das ist beeindruckend. <br />
                    Wenn du dich mal mit unseren Profis unterhalten möchtest,{' '}
                    <a
                      class="leaderboard__advice"
                      target="_blank"
                      href="https://www.bekb.ch/services/beratung"
                    >
                      melde dich bei uns.
                    </a>
                  </React.Fragment>
                )}
              </p>
              <h3 className="leaderboard__top5">Top 5</h3>
              <table className="leaderboard__table" cellSpacing="0">
                {leaderboard
                  .slice(0, 5)
                  .map(({ name, score, you = false }, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td className={you ? 'leaderboard__leader-you' : ''}>
                        {name}
                      </td>
                      <td>{score}.-</td>
                    </tr>
                  ))}
              </table>
              <div className="leader-board-buttons">
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
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {shadowBox && (
        <ShadowBox close={() => setShadowBox(false)}>
          <p className="popup-score">Spielstand: {formattedValue}.-</p>
          <label className="popup-label" for="name">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onInput={e => setName((e.target as HTMLInputElement).value)}
          />
          <Button
            className="score-button"
            onClick={() => {
              if (name === '') {
                alert('Bitte gib einen Namen ein');
              } else {
                axios.post('https://backend.bekb.dev/leaderboard', {
                  name: name,
                  score: formattedValue,
                });
                setShadowBox(false);
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
