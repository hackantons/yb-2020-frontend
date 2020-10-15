import React from 'react';

import { useStoreState, useActions } from 'unistore-hooks';
import { actions } from '@store/index';
import { State } from '@store/types';

import './Portfolio.css';
import Asset from './Asset';

const Portfolio = ({ className = '' }: { className?: string }) => {
  const { portfolio, eventOutcome }: State = useStoreState(['portfolio']);
  const { updateAsset } = useActions(actions);

  const totalAssets = React.useMemo(
    () => portfolio.reduce((acc, asset) => acc + asset.value, 0),
    [portfolio]
  );

  return (
    <div className={`portfolio ${className}`}>
      <div className="portfolio__assets">
        {portfolio.map(({ key, value }) => (
          <Asset
            locked={eventOutcome === null}
            key={key}
            assetKey={key}
            value={value}
            modifyAsset={value => updateAsset(key, value)}
            totalAssets={totalAssets}
            changeFromStep={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
