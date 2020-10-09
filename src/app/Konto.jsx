import React from 'react';

import './Konto.css';

const Konto = ({ bank, assets }) => {
  const bankHeight = React.useMemo(() => (100 / (bank + assets)) * bank, [
    bank,
    assets,
  ]);

  return (
    <div className="konto">
      <div className="konto__bar">
        <div className="konto__bank" style={{ height: `${bankHeight}%` }} />
      </div>
    </div>
  );
};

export default Konto;
