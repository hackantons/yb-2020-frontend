import React from 'react';

import './KontoH.css';

const KontoH = ({ bank, assets }) => {
  const bankWidth = React.useMemo(() => (100 / (bank + assets)) * bank, [
    bank,
    assets,
  ]);

  return (
    <div className="konto-h">
      <div className="konto-h__bar">
        <div className="konto-h__bank" style={{ width: `${bankWidth}%` }} />
      </div>
    </div>
  );
};

export default KontoH;
