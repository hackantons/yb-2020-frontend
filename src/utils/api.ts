import axios, { AxiosPromise } from 'axios';

export const getLeaderboard = (): AxiosPromise =>
  axios.get('https://backend.bekb.dev/leaderboard');
