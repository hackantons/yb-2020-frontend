import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import Zeitstrahl from './app/zeitstrahl/Zeitstrahl';

const App = () => (
  <div>
    <Zeitstrahl
      shares={{
        'Aktie 1': 50,
        'Aktie 2': 50,
      }}
    />
  </div>
);

ReactDOM.render(<App />, document.querySelector('body'));
