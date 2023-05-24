import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import ProductDetails from './components/products/ProductDetails';
import ProductsList from './components/products/ProductsList';
import ShoppingCart from './components/products/ShoppingCart';
import OrderCompleted from './components/products/OrderCompleted';
import Checkout from './components/products/Checkout';
import Login from './admin/components/Login';
import Template from './admin/components/layout/Template';
import AddUser from './admin/components/users/AddUser';
import Users from './admin/components/users';

function AppRoutes() {

    const routes = [
        {
            path: '/',
            element: Home,
        },
        {
            path: '/products',
            element: ProductsList,
        },
        {
            path: '/products/details',
            element: ProductDetails,
        },
        {
            path: '/cart',
            element: ShoppingCart,
        },
        {
            path: '/products/orders/completed',
            element: OrderCompleted,
        },
        {
            path: '/products/orders/checkout',
            element: Checkout,
        },

        //admin routes
        {
            path: '/admin/login',
            element: Login,
        }
    ];

    return (
        <Routes>
            {
                routes.map((route, index) => (
                    <Route key={index} exact path={route.path} element={<route.element />} />
                ))

            }
            <Route path="/admin" element={<Template />}>
                <Route path="users/add" element={<AddUser />} />
                <Route path="users" element={<Users />} />
            </Route>
            {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
    );


}

export default AppRoutes;
