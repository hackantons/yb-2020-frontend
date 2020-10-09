import React from 'react';

import './Asset.css';

const Asset = ({ assetKey, value, modifyAsset }) => (
  <p className="asset">
    <img
      className="asset__image--filled"
      src={`/assets/static/${assetKey}.png`}
    />
    <span className="asset__value">{value} </span>
    <button onClick={() => modifyAsset(assetKey, -10)}>-</button> /{' '}
    <button onClick={() => modifyAsset(assetKey, +10)}>+</button>
  </p>
);

export default Asset;
