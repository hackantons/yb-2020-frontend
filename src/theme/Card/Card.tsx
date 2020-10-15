import React from 'react';
import { Button } from '@theme';

import './Card.css';

const Card = ({
  title,
  titleRight,
  children,
  ctaOnClick,
  ctaText = 'weiter',
  ctaProps,
  className = '',
}: {
  title: string | React.JSX.Element | React.JSX.Element[];
  titleRight?: string | React.JSX.Element | React.JSX.Element[];
  children: React.JSX.Element | React.JSX.Element[];
  ctaOnClick?: Function;
  ctaText?: string;
  ctaProps?: { [key: string]: any };
  className?: string;
}) => (
  <div className={`card ${className}`}>
    <div className="card__inner">
      <div className="card__header">
        <div className="card__title">{title}</div>
        {titleRight && <div className="card__title-right">{titleRight}</div>}
      </div>
      <div className="card__body">{children}</div>
      {ctaOnClick && (
        <Button className="card__cta" onClick={ctaOnClick} {...ctaProps}>
          {ctaText}
        </Button>
      )}
    </div>
  </div>
);

export default Card;
