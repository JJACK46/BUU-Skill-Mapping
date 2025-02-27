import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { EnumUserRole } from 'src/data/roles';
import { useAuthStore } from 'src/stores/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const { meta, path } = to;
    const isPublic = meta?.public || false;
    const requiredRole = meta?.role || null;

    try {
      const auth = useAuthStore();
      auth.loadUserFromSession();
      const { getAccessToken } = auth;
      const userRole = auth.getRole;
      if (!userRole && path !== '/login') {
        return next('/login');
      }
      // Bypass now
      // const isAuthenticated = true;
      // const userRole = EnumUserRole.ADMIN;

      // Handle '/' route, first order
      if (path === '/') {
        const redirectPath = userRole ? `/${userRole}/dashboard` : '/landing';
        return next(redirectPath);
      }

      if (path.startsWith('/curr')) {
        return next();
      }

      // Handle public routes first
      if (isPublic && !getAccessToken) {
        return next(); // Allow access to public routes
      }

      // Redirect authenticated users away from the login page
      if (path === '/login' && userRole) {
        return next('/');
      }

      // Redirect unauthenticated users from protected routes
      if (!isPublic && !userRole) {
        return next('/login');
      }

      // Redirect users lacking the required role
      if (requiredRole && (!userRole || userRole !== requiredRole)) {
        return next('/forbidden');
      }
      // Redirect depend on role
      const rolePaths = {
        [EnumUserRole.ADMIN]: `/${EnumUserRole.ADMIN}${path}`,
        [EnumUserRole.COORDINATOR]: `/${EnumUserRole.COORDINATOR}${path}`,
        [EnumUserRole.INSTRUCTOR]: `/${EnumUserRole.INSTRUCTOR}${path}`,
        [EnumUserRole.STUDENT]: `/${EnumUserRole.STUDENT}${path}`,
      };

      // Redirect only if userRole exists and current path is not already correct
      const redirectPath = rolePaths[userRole];
      if (redirectPath && !path.startsWith(`/${userRole}`)) {
        return next(redirectPath);
      }

      // Proceed to the route
      next();
    } catch (error) {
      console.error('Error during route guard execution:', error);

      // Ensure not to redirect to `/error` if already there
      if (path !== '/error') {
        return next('/error');
      }

      // Proceed to `/error` route without recursion
      next();
    }
  });

  return Router;
});
