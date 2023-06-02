import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import ProductDetails from './components/products/ProductDetails';
import ProductsList from './components/products/ProductsList';
import ShoppingCart from './components/products/ShoppingCart';
import OrderCompleted from './components/products/OrderCompleted';
import Checkout from './components/products/Checkout';

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
            path: '/products/details/:productId',
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
        }
    ];

    return (
        <Routes>
            {
                routes.map((route, index) => (
                    <Route key={index} exact path={route.path} element={<route.element />} />
                ))

            }
            
        </Routes>
    );


}

export default AppRoutes;
