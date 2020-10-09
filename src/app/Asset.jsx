import React from 'react';
import ContUp from 'react-countup';
import './Asset.css';

const Asset = ({ assetKey, value, modifyAsset }) => {
  const [dragging, setDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [x, setX] = React.useState(0);
  const lastModifiedValue = React.useRef();

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
      <img
        className="asset__image--filled"
        src={`/assets/static/${assetKey}.png`}
      />
      <span className="asset__value">{value}</span>
      <button onClick={() => modifyAsset(-100)}>-</button> /{' '}
      <button onClick={() => modifyAsset(+100)}>+</button>
    </div>
  );
};

export default Asset;
