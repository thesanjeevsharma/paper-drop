export const ROUTES = {
  HOME: {
    path: "/playground",
    isProtected: true,
  },
  MY_DROPS: {
    path: "/my-drops",
    isProtected: true,
  },
  LOGIN: {
    path: "/",
    isProtected: false,
  },
};

export const PROTECTED_ROUTE_PATHS = Object.values(ROUTES)
  .filter((route) => route.isProtected)
  .map((route) => route.path);
