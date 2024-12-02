import LoginPage from "../components/Login-SignUp/LoginPage";
import SignupPage from "../components/Login-SignUp/SignupPage";
import Page from "../pages/AdminPage/Page";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import CreateOrder from "../pages/Order/CreateOrder";
import ProductDetailsPage from "../pages/ProductDetaislPage/ProductDetaislPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";

export const routes = [
    {
        path: '/admin',
        page: Page
    },
    {
        path: '/',
        page: HomePage
    },
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/signup',
        page: SignupPage
    },
    {
        path: '/product/:_id',
        page: ProductDetailsPage
    },
    {
        path: '/products',
        page: ProductsPage
    },
    {
        path: '/cart',
        page: CartPage
    },
    {
        path: '/order',
        page: CreateOrder
    },
    {
        path: '/profile',
        page: ProfilePage
    },
    {
        path: '*',
        page: NotFoundPage
    }
];
