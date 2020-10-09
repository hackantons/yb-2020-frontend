import React from 'react';
import ContUp from 'react-countup';
import './Asset.css';

const Asset = ({ assetKey, value, modifyAsset, totalAssets }) => {
  const [dragging, setDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [x, setX] = React.useState(0);
  const lastModifiedValue = React.useRef();

  /* this is how code looks when a designer codes and most likely needs to be refactored :) */
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

  React.useEffect(() => {
    const toSet = lastModifiedValue.current ? x - lastModifiedValue.current : x;
    modifyAsset(toSet);
    lastModifiedValue.current = toSet;
  }, [x]);

  return (
    <div
      onTouchStart={e => {
        setDragging(true);
        setStartX(e.touches[0].clientX);
      }}
      onTouchEnd={() => {
        setDragging(false);
        setStartX(0);
      }}
      onTouchMove={e => {
        if (dragging) {
          setX((startX - e.touches[0].clientX) * -1);
        }
      }}
      className="asset"
    >
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
      <span className="asset__value">{value}</span>
      <button onClick={() => modifyAsset(-100)}>-</button> /{' '}
      <button onClick={() => modifyAsset(+100)}>+</button>
    </div>
  );
};

export default Asset;
