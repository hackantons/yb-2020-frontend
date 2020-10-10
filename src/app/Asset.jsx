import React from 'react';
import ContUp from 'react-countup';
import './Asset.css';

const Asset = ({
  assetKey,
  value,
  modifyAsset,
  totalAssets,
  locked,
  changeFromStep,
}) => {
  const [dragging, setDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [oldValue, setOldValue] = React.useState(value);
  const [counterClass, setCounterClass] = React.useState('');

  React.useEffect(() => {
    if (changeFromStep) {
      setCounterClass('');
      window.setTimeout(() => {
        setCounterClass(value >= oldValue ? 'increase' : 'decrease');
      }, 10);
    }
    setOldValue(value);
  }, [value]);

  const emptyHeight = React.useMemo(() => {
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

    return range - range * percentageOfTotalAssets + min;
  }, [totalAssets, value]);

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
        if (dragging && !locked) {
          modifyAsset(startY - e.touches[0].clientY);
          setStartY(e.touches[0].clientY);
        }
      }}
      className={`asset ${locked ? 'asset--locked' : ''}`}
    >
      <div className="asset__icons">
        <img
          className="asset__image--filled"
          src={`/assets/static/${assetKey}.png`}
        />
        <div
          className="asset__icon__empty"
          style={{ height: `${emptyHeight}%` }}
        >
          <img
            className="asset__image--empty"
            src={`/assets/static/${assetKey}-empty.png`}
          />
        </div>
      </div>
      <span className={`asset__value ${counterClass}`}>
        <ContUp
          end={Math.floor(value)}
          duration={1}
          preserveValue
          suffix=".‒"
        />
      </span>
    </div>
  );
};

export default Asset;
