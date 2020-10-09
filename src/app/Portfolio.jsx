import React from 'react';

import './Portfolio.css';
import Asset from '@app/Asset';

const Portfolio = ({
  locked = false,
  portfolio,
  setPortfolio,
  bank,
  setBank,
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
      <h2 className="portfolio__title">Bank</h2>
      <p>Kontostand: {bank}</p>
      <h2>Assets</h2>
      <div className="portfolio__assets">
        {Object.entries(portfolio).map(([key, value]) => (
          <Asset
            key={key}
            assetKey={key}
            value={value}
            modifyAsset={modifyAsset}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
