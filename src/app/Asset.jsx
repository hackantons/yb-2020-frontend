import React from 'react';
import ContUp from 'react-countup';
import './Asset.css';

const Asset = ({ assetKey, value, modifyAsset, totalAssets }) => {
  const [dragging, setDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);

  let emptyHeight = totalAssets ? 100 - (value / totalAssets) * 100 : 100;
  emptyHeight = emptyHeight.toString() + '%';

  return (
    <div
      onTouchStart={e => {
        setDragging(true);
        setStartY(e.touches[0].clientY);
      }}
      onTouchEnd={() => {
        setDragging(false);
        setStartY(0);
      }}
      onTouchMove={e => {
        if (dragging) {
          modifyAsset(startY - e.touches[0].clientY);
          setStartY(e.touches[0].clientY);
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
    </div>
  );
};

export default Asset;
