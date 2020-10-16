import React from 'react';

import { useStoreState, useActions } from 'unistore-hooks';
import { actions } from '@store/index';
import { Button, Card } from '@theme';

import './LeaderBoard.css';
import { State } from '@store/types';
import { getLeaderboard } from '@utils/api';
import { formatCurrency } from '@utils/helpers';

const LeaderBoard = ({ className = '' }: { className?: string }) => {
  const { portfolio, accountBalance }: State = useStoreState([
    'portfolio',
    'accountBalance',
  ]);
  const { resetGame } = useActions(actions);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [leaders, setLeaders] = React.useState([]);

  const totalValue = React.useMemo(
    () =>
      portfolio.reduce((acc, asset) => acc + asset.value, 0) + accountBalance,
    [portfolio, accountBalance]
  );
  const formattedTotalValue = React.useMemo(() => {
    return formatCurrency(totalValue);
  }, [totalValue]);

  React.useEffect(() => {
    setLoading(true);
    getLeaderboard()
      .then(payload => {
        setLeaders([
          ...payload.data,
          {
            name: 'DU',
            score: totalValue,
            you: true,
          },
        ]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
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
    <Card
      title={<img src="/assets/static/logo.svg" alt="BEKB Logo" />}
      titleRight="Leaderboard"
      ctaOnClick={() => resetGame()}
      ctaText="Neues Spiel starten"
      className={className}
    >
      {loading ? (
        <p style={{ marginTop: '80px', textAlign: 'center' }}>loading..</p>
      ) : error ? (
        <p style={{ marginTop: '80px', textAlign: 'center' }}>
          Das Leaderboard kann leider offline nicht angezeigt werden.
          <br />
          Aber zum Glück treffen sich unsere Experten auch offline gerne mit
          dir: 031 666 18 80
        </p>
      ) : (
        <div className="leaderboard">
          <div className="leaderboard__rank">
            Du hast mit <span className="total">{formattedTotalValue}</span>
            <h2>Platz {myPosition}</h2> erreicht.{' '}
          </div>
          {myPosition >= 6 ? (
            <React.Fragment>
              Da ist wohl noch etwas Verbesserungsbedarf. <br />
              Mit echtem Geld braucht es mehr Wissen und dabei helfen unsere
              Profis dir gerne:{' '}
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
          {/*<div className="leader-board-buttons">
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
          </div>*/}
        </div>
      )}
    </Card>
  );
};

export default LeaderBoard;
