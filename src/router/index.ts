import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import AuthService from 'src/services/auth';
import { EnumUserRole } from 'src/enums/roles';

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

  Router.beforeEach(async (to, from, next) => {
    const isPublic = to.meta?.public || false;
    const requiredRole = to.meta?.role || null;

    try {
      // Fetch authentication and user role status
      const isAuthenticated = await AuthService.isAuthenticated();
      const userRole = isAuthenticated ? await AuthService.getUserRole() : null;

      if (to.path === '/' && isAuthenticated) {
        return next(`${userRole}/dashboard`);
      }

      if (to.path === '/' && !isAuthenticated) {
        return next('/landing');
      }

      // Allow Admin users access to all /admin routes
      if (userRole === EnumUserRole.ADMIN && to.path.startsWith('/admin')) {
        return next(); // Allow navigation for Admin
      }

      // Redirect authenticated users away from the login page
      if (to.path === '/login' && isAuthenticated) {
        return next('/');
      }

      // Redirect unauthenticated users away from protected routes
      if (!isPublic && !isAuthenticated) {
        return next('/login');
      }

      // Check if the route requires a specific role
      if (requiredRole && userRole !== requiredRole) {
        return next('/forbidden'); // Redirect unauthorized users to a forbidden page
      }

      // Proceed to the route
      next();
    } catch (error) {
      console.error('Error during route guard execution:', error);
      next('/error'); // Redirect to a generic error page if something goes wrong
    }
  });

  return Router;
});
