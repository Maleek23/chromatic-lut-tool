/** Routes that render inside the authenticated app shell (sidebar + topbar). */
export const APP_ROUTE_PREFIXES = [
  "/studio",
  "/dashboard",
  "/settings",
  "/convert",
  "/analyze",
  "/optimize",
];

export function isAppRoute(path: string): boolean {
  return APP_ROUTE_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}
