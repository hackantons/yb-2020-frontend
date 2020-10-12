import React from 'react';

import './Konto.css';

const KontoH = ({ bank, assets }) => {
  const max = 3000;
  const totalWealth = Math.floor(bank + assets);
  const bankWidth = React.useMemo(() => (100 / totalWealth) * bank, [
    bank,
    assets,
  ]);
  const investRatio = Math.ceil(100 - bankWidth);
  const barWidth = Math.min((totalWealth / max) * 100, 100);

  return (
    <div className="portfolio__konto konto">
      <div className="konto__label">
        <h3 className="test">
          Dein Vermögen CHF {totalWealth.toLocaleString('de-CH')}.-
        </h3>
        <span> {investRatio}% investiert</span>
      </div>
      <div className="konto__bar">
        <div className="konto__total" style={{ width: `${barWidth}%` }}>
          <div className="konto__bank" style={{ width: `${bankWidth}%` }} />
        </div>
      </div>
      <div className="konto__skala">
        <span>0</span>
        <span>1'000</span>
        <span>2'000</span>
        <span>3'000</span>
      </div>
    </div>
  );
};

export default KontoH;
