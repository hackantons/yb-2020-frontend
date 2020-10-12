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

// @ts-ignore
export const isDev = (): boolean => String(IS_DEV) === 'true';
