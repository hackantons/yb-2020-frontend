import React from 'react';

export const shuffle = (a: Array<any>): Array<any> => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const windowResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const formatCurrency = (
  number: number,
  addCurrency: boolean = true
): string =>
  (addCurrency ? 'CHF ' : '') +
  Math.round(number).toLocaleString('de-CH') +
  '.-';

export const formatMultiplier = (
  multiplier: number,
  addColor: boolean = true
): any => {
  const percent = Math.round((multiplier - 1) * 100);
  return addColor ? (
    <span
      className={`multiplier-percent multiplier-percent--${
        percent >= 0 ? 'positive' : 'negative'
      }`}
    >
      {percent >= 0 ? '+' : ''}
      {percent}%
    </span>
  ) : (
    `${percent >= 0 ? '+' : ''}${percent}%`
  );
};

// @ts-ignore
export const isDev: boolean = String(IS_DEV) === 'true';
