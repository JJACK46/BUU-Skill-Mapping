import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import AuthService from 'src/services/auth';

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
    const publicRoute = to.meta?.public || false;
    const isAuthenticated = await AuthService.fetchProfile();

    // Avoid redirect loops by checking the destination route
    if (to.path === '/login' && isAuthenticated) {
      // If already authenticated, no need to go to login page, redirect to the home page
      return next('/');
    }

    if (to.path === '/' && !isAuthenticated) {
      return next('/login');
    }

    // If the route is not public and the user is not authenticated, redirect to forbidden page
    if (!publicRoute && !isAuthenticated && to.path !== '/forbidden') {
      return next('/forbidden');
    }

    // Proceed to the next route
    next();
  });

  return Router;
});
