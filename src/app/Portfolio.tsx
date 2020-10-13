import React from 'react';

import './Portfolio.css';
import Asset from '@app/Asset';
import Konto from '@app/Konto';

import { PortfolioD } from '@app/types';

const Portfolio = ({
  locked = false,
  portfolio,
  setPortfolio,
  bank,
  setBank,
  totalAssets,
  changeFromStep,
  className = '',
}: {
  locked: boolean;
  portfolio: PortfolioD;
  setPortfolio: Function;
  bank: number;
  setBank: Function;
  totalAssets: number;
  changeFromStep: boolean;
  className?: string;
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
    <div className={`portfolio ${className}`}>
      <div className="portfolio__assets">
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
      <Konto bank={bank} assets={totalAssets} />
    </div>
  );
};

export default Portfolio;
