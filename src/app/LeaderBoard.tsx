import React from 'react';

import { useStoreState, useActions } from 'unistore-hooks';
import { actions } from '@store/index';
import { Card } from '@theme';

import './LeaderBoard.css';

const LeaderBoard = ({ className = '' }: { className?: string }) => {
  const { resetGame } = useActions(actions);
  return (
    <Card
      title="Leaderboard"
      ctaOnClick={() => resetGame()}
      ctaText="Neues Spiel starten"
      className={className}
    >
      <h1>Leaderboard</h1>
    </Card>
  );
};

export default LeaderBoard;
