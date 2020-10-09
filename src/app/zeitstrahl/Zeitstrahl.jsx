import React from 'react';

import { getShares } from '@utils/api.js';

const Zeitstrahl = ({ shares }) => {
  return (
    <div id="zeitstrahl">
      {Object.entries(shares).map(([label, value]) => (
        <p>
          {label}: {value}
        </p>
      ))}
    </div>
  );
};

export default Zeitstrahl;
