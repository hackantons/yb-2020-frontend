import React from 'react';

import './Button.css';

const Button = ({
  children = '',
  className = '',
  clickAfter = 0,
  timerKey = '',
  onClick,
  ...props
}) => {
  const [time, setTime] = React.useState(0);
  const timerWidth = React.useMemo(() => {
    const timeToClick = clickAfter * 1000;
    return Math.floor((100 / (clickAfter * 1000)) * time);
  }, [time, clickAfter, timerKey]);

  React.useEffect(() => {
    setTime(0);
    let timer;
    if (clickAfter !== 0) {
      timer = window.setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 10;
          if (newTime >= clickAfter * 1000) {
            onClick();
            window.clearInterval(timer);
          }
          return prevTime + 10;
        });
      }, 10);
    }
    return () => {
      window.clearInterval(timer);
    };
  }, [timerKey]);

  return (
    <button {...props} className={`${className} button`} onClick={onClick}>
      <span className="button__content">{children}</span>
      <span className="button__timer" style={{ width: `${timerWidth}%` }} />
    </button>
  );
};

export default Button;
