import React from 'react';
import { ShadowBox } from '@theme';

const InformationPopup = ({ setOpen }: { setOpen: Function }) => (
  <ShadowBox close={() => setOpen(false)}>
    <div className="explanation">
      <img
        class="asset__image--filled explanation-icon"
        src="/assets/static/real-estate.png"
      />
      <p>
        Dieses Icon stellt die Immobilien in deinem Portfdolio dar, überlege dir
        gut ob es Sinn macht zu investieren
      </p>
      <img
        class="asset__image--filled explanation-icon"
        src="/assets/static/shares.png"
      />
      <p>
        Dieses Icon stellt die Aktien in deinem Portfdolio dar, Sie sind
        volatiler als Rohstoffe und Immobilien.
      </p>
      <img
        class="asset__image--filled explanation-icon"
        src="/assets/static/commodities.png"
      />
      <p>
        Dieses Icon stellt die Rohstoffe in deinem Portfolio dar, die Rohstoffe
        sind als Anlage stabiler, aber bringen weniger Gewinn
      </p>
      <br />
      <p>
        Mit all diesen Icons lässt sich per rauf und runter "swipen"
        interagieren
      </p>
      <br />

      <img
        class="asset__image--filled explanation-bar"
        src="/assets/static/bar.png"
      />
      <p>
        Dieser Balken stellt dein Bankvermögen dar, dieses Geld kannst du
        investieren oder bei der BEKB sicher lagern
      </p>
    </div>
  </ShadowBox>
);

export default InformationPopup;
