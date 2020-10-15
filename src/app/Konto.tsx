import React from 'react';
import { useStoreState } from 'unistore-hooks';
import { State } from '@store/types';

import './Konto.css';
import { formatCurrency } from '@utils/helpers';

const SKALA = [0, 1000, 2000, 3000];

const Konto = ({ className = '' }: { className?: string }) => {
  const { accountBalance, portfolio }: State = useStoreState([
    'accountBalance',
    'portfolio',
  ]);

  const {
    totalWealth,
    investRatio,
    barWidth,
    bankWidth,
  } = React.useMemo(() => {
    const totalAssets = portfolio.reduce((acc, asset) => acc + asset.value, 0);
    const totalWealth = Math.floor(accountBalance + totalAssets);
    const bankWidth = (100 / totalWealth) * accountBalance;

    return {
      totalWealth,
      investRatio: Math.ceil(100 - bankWidth),
      barWidth: Math.min((totalWealth / SKALA[SKALA.length - 1]) * 100, 100),
      bankWidth: (100 / totalWealth) * accountBalance,
    };
  }, [accountBalance, portfolio]);

  return (
    <div className={`${className} konto`}>
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
        {SKALA.map((number, i) => (
          <span
            className="konto__skala-item"
            style={{ width: i === 0 ? 0 : `${100 / (SKALA.length - 1)}%` }}
          >
            <i>{formatCurrency(number, false)}</i>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Konto;
