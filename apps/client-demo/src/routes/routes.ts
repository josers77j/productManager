import AuthPage from "../modules/auth/auth-page";
import NotFound from "../modules/exceptions/not-found.exception";
import DashboardPage from "../modules/dashboard/dashboard-page";
import UserPage from "../modules/admin/users/user-page";

const routes = [
  { path: '/', component: AuthPage, module: 'auth', protected: false },
  { path: '/dashboard', component: DashboardPage, module: 'dashboard', protected: false, action: 'ACCESS', route: '/dashboard' },
  { path: '/users', component: UserPage, module: 'users', protected: true, action: 'READ', route: '/api/users' },
  { path: '*', component: NotFound, module: 'notFound', protected: false },
];

export default routes;
