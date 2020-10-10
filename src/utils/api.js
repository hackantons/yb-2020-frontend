import axios from 'axios';

export const getShares = axios.get(
  'https://master.d2zwkrlfel87st.amplifyapp.com'
);

export const getLeaderboard = axios.get(
  'https://blockchain.greaming.de/leaderboard'
);
