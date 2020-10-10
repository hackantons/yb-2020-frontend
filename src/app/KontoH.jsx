import React from 'react';

import './KontoH.css';

const KontoH = ({ bank, assets }) => {
  const max = 3000;
  const totalWealth = Math.floor(bank + assets);
  const bankWidth = React.useMemo(() => (100 / totalWealth) * bank, [
    bank,
    assets,
  ]);
  const investRatio = Math.ceil(100 - bankWidth);
  const barWidth = Math.min((totalWealth / max) * 100, 100);

  console.log('bank', bank);
  console.log('assets', assets);
  console.log('barWidth', barWidth);

  return (
    <div className="portfolio__konto konto-h">
      <div className="konto-h__label">
        <h3>Dein Vermögen {totalWealth.toLocaleString()} CHF</h3>
        <span>({investRatio}% investiert)</span>
      </div>
      <div className="konto-h__bar">
        <div className="konto-h__total" style={{ width: `${barWidth}%` }}>
          <div className="konto-h__bank" style={{ width: `${bankWidth}%` }} />
        </div>
      </div>
      <div className="konto-h__skala">
        <span>0</span>
        <span>1m</span>
        <span>2m</span>
        <span>3m</span>
      </div>
    </div>
  );
};

export default KontoH;
