import React from 'react';
import ContUp from 'react-countup';
import './Asset.css';

const Asset = ({ assetKey, value, totalAssets, modifyAsset }) => {
  const percentageOfTotalAssets = totalAssets ? value / totalAssets : 0;
  let min = 5;
  let max = 80;


  switch (assetKey) {
    case 'real-estate':
      min = 0;
      max = 74;
      break;
    case 'commodities':
      min = 10;
      max = 80;
      break;
    case 'shares':
      min = 0;
      max = 79;
      break;
  }

  const range = max - min; // the visible icon is between 80 and 5%

  let emptyHeight = range - (range * percentageOfTotalAssets) + min;
  emptyHeight = emptyHeight.toString() + '%';

  return (
    <p className="asset">
      <div className="asset__icons">
        <img
          className="asset__image--filled"
          src={`/assets/static/${assetKey}.png`}
        />
        <div className="asset__icon__empty" style={{ height: emptyHeight }}>
          <img
            className="asset__image--empty"
            src={`/assets/static/${assetKey}-empty.png`}
          />
        </div>
      </div>
      <span className="asset__value">
        <ContUp preserveValue start={0} end={value} />
      </span>
      <button onClick={() => modifyAsset(assetKey, -100)}>-</button> /{' '}
      <button onClick={() => modifyAsset(assetKey, +100)}>+</button>
    </p>
  );
};

export default Asset;
