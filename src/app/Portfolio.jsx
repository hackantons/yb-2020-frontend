import React from 'react';

import './Portfolio.css';
import Asset from '@app/Asset';
import Konto from '@app/Konto';
import KontoH from '@app/KontoH';

const USE_H_KONTO = true;

const Portfolio = ({
  locked = false,
  portfolio,
  setPortfolio,
  bank,
  setBank,
  totalAssets,
  changeFromStep,
}) => {
  const modifyAsset = (key, value) => {
    let newPortfolioValue = portfolio[key] + value;
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
        {!USE_H_KONTO && <Konto bank={bank} assets={totalAssets} />}
        {Object.entries(portfolio).map(([key, value]) => (
          <Asset
            locked={locked}
            key={key}
            assetKey={key}
            value={value}
            modifyAsset={value => modifyAsset(key, value)}
            totalAssets={totalAssets}
            changeFromStep={changeFromStep}
          />
        ))}
      </div>
      {USE_H_KONTO && <KontoH bank={bank} assets={totalAssets} />}
    </div>
  );
};

export default Portfolio;
