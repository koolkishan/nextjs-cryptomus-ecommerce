// // export const protectedEndpoints: Record<string, boolean> = {
// //     "/profile": true,
// //     "/wishList": true,
// //     "/cart": true,
// //     "/checkout": true,
// //     "/admin": true,
// //     "/auth": false,
// //   };

// // routes.js

// export const protectedEndpoints:Record<string, boolean>  = {
//   "/profile": true,
//   "/wishList": true,
//   "/cart": true,
//   "/checkout": true,
//   // "/admin": true,
// };

const DEFAULT_USER_REDIRECT_URL = "/";
const DEFAULT_ADMIN_REDIRECT_URL = "/admin/dashboard";
const USER_AUTH_URL = "/auth"
const ADMIN_AUTH_URL = "/auth/admin"
const PROTECTED_URL = [
  "/admin/dashboard",
  "/admin/categories",
  "/admin/order",
  "/admin/products",
  "/profile",
  "/wishList",
  "/cart",
  "/checkout"
];
export  {
  DEFAULT_ADMIN_REDIRECT_URL,
  DEFAULT_USER_REDIRECT_URL,
  USER_AUTH_URL,
  ADMIN_AUTH_URL,
  PROTECTED_URL
};
