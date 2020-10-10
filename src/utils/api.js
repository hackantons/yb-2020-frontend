import axios from 'axios';

export const getShares = axios.get('https://bekb.dev');

export const getLeaderboard = axios.get('https://backend.bekb.dev/leaderboard');
