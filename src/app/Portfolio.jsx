import React from 'react';

import './Portfolio.css';
import Asset from '@app/Asset';
import Konto from '@app/Konto';

const Portfolio = ({
  locked = false,
  portfolio,
  setPortfolio,
  bank,
  setBank,
  totalAssets,
}) => {
  const modifyAsset = (key, value) => {
    const newPortfolioValue = portfolio[key] + value;
    const newBank = bank - value;
    if (newBank < 0 || newPortfolioValue < 0) {
      return;
    }

    setBank(newBank);
    setPortfolio({ ...portfolio, [key]: newPortfolioValue });
  };

  return (
    <div className="portfolio">
      <div className="portfolio__assets">
        <Konto bank={bank} assets={totalAssets} />
        {Object.entries(portfolio).map(([key, value]) => (
          <Asset
            key={key}
            assetKey={key}
            value={value}
            totalAssets={totalAssets}
            modifyAsset={modifyAsset}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
