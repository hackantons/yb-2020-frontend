import axios, { AxiosPromise } from 'axios';

/* MOCK
export const getLeaderboard = (): AxiosPromise =>
  axios.get('https://backend.bekb.dev/leaderboard');
*/

export const getLeaderboard = (): Promise<{
  data: Array<{ name: string; score: number }>;
}> =>
  new Promise(resolve =>
    resolve({
      data: [
        { name: 'John Doe', score: 1200 },
        { name: 'Felix Muster', score: 850 },
      ],
    })
  );
