const API = process.env.REACT_APP_API;

export const API_URLS = {
   CREATE_ACCOUNT: `${API}/users`,
   DROP_MESSAGE: `${API}/drops`,
   FETCH_NEARBY_DROPS: `${API}/drops`,
   FETCH_MY_DROPS: `${API}/drops/my`,
   FETCH_DROP: `${API}/drops`,
   DELETE_DROP: `${API}/drops`,
};
