import React from 'react';

const Assets = ({ locked = false, portfolio, setPortfolio, bank, setBank }) => {
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
    <div>
      <h2>Bank</h2>
      <p>Kontostand: {bank}</p>
      <h2>Assets</h2>
      {Object.entries(portfolio).map(([name, value]) => (
        <p>
          {name}: {value}{' '}
          <button onClick={() => modifyAsset(name, -10)}>-</button> /{' '}
          <button onClick={() => modifyAsset(name, +10)}>+</button>
        </p>
      ))}
    </div>
  );
};

export default Assets;
