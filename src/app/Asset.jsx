import React from 'react';
import ContUp from 'react-countup';
import './Asset.css';

const Asset = ({ assetKey, value, modifyAsset }) => {
  return (
    <p className="asset">
      <div className="asset__icons">
        <img
          className="asset__image--filled"
          src={`/assets/static/${assetKey}.png`}
        />
        <div className="asset__icon__empty">
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
