export const BE_API = process.env.REACT_APP_API;

export const API_URLS = {
   CREATE_ACCOUNT: `${BE_API}/users`,
   DROP_MESSAGE: `${BE_API}/drops`,
   FETCH_NEARBY_DROPS: `${BE_API}/drops`,
   FETCH_MY_DROPS: `${BE_API}/drops/my`,
   FETCH_DROP: `${BE_API}/drops`,
   DELETE_DROP: `${BE_API}/drops`,
};
