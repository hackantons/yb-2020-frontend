import React from 'react';
import ContUp from 'react-countup';
import './Asset.css';

const Asset = ({ assetKey, value, modifyAsset }) => {
  return (
    <p className="asset">
      <img
        className="asset__image--filled"
        src={`/assets/static/${assetKey}.png`}
      />
      <span className="asset__value">
        <ContUp preserveValue start={0} end={value} />
      </span>
      <button onClick={() => modifyAsset(assetKey, -100)}>-</button> /{' '}
      <button onClick={() => modifyAsset(assetKey, +100)}>+</button>
    </p>
  );
};

export default Asset;
