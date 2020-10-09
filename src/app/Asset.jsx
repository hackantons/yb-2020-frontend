import React from 'react';
import ContUp from 'react-countup';
import './Asset.css';

const Asset = ({ assetKey, value, modifyAsset, totalAssets }) => {
  const [dragging, setDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [x, setX] = React.useState(0);
  const lastModifiedValue = React.useRef();
  let emptyHeight = totalAssets ? 100 - (value / totalAssets) * 100 : 100;
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
