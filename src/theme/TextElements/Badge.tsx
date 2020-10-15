import React from 'react';

import './Badge.css';

const Badge = ({
  className = '',
  children,
}: {
  className?: string;
  children: any;
}) => <span className={`${className} badge`}>{children}</span>;

export default Badge;
