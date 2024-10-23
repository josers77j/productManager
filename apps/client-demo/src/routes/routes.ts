import AuthPage from "../modules/auth/auth-page";
import NotFound from "../modules/exceptions/not-found.exception";

import dashboardPage from "../modules/dashboard/dashboard-page";


const routes = [
  { path: '/', component: AuthPage, module: 'auth' }, // Ruta de autenticación
  { path: '/dashboard', component: dashboardPage, module: 'dashboard' },
  { path: '*', component: NotFound, module: 'about' },

  // Agrega más rutas según sea necesario
];

export default routes;
