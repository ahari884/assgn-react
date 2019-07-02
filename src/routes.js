import { LoginPage } from './components/login/LoginPage';
import { DashboardPage } from './components/DashboardPage';

export const apiRoutes = [
    {
        isAuthenticated: false,
        path: '/',
        component: LoginPage
    },
    {
        isAuthenticated: true,
        path: '/dashboard',
        component: DashboardPage
    }
]