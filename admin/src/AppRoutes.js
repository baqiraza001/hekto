import { Route, Routes } from 'react-router-dom';
import Template from './components/layout/Template';
import AddUser from './components/users/AddUser';
import Users from './components/users/Users';
import EditUser from './components/users/EditUser';
import Dashboard from './components/Dashboard';
import Products from './components/products/Products';
import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';
import Profile from './components/users/Profile';
import Categories from './components/categories/Categories';
import AddCategory from './components/categories/AddCategory';
import EditCategory from './components/categories/EditCategory';
import Brands from './components/brands/Brands';
import AddBrand from './components/brands/AddBrand';
import EditBrand from './components/brands/EditBrand';
import Reviews from './components/products/Reviews';
import NotFound from './components/NotFound';
import Configuration from './components/Configuration';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/admin/" element={<Template />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="settings" element={<Configuration />} />
                <Route path="profile" element={<Profile />} />
                <Route path="users/add" element={<AddUser />} />
                <Route path="users" element={<Users />} />
                <Route path="users/edit/:id/:rows/:page/" element={<EditUser />} />
                <Route path="users/:recordsPerPage/:pageNumber/" element={<Users />} />


                {/* Products Routes */}
                <Route path="products" element={<Products />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/edit/:id/:rows/:page/" element={<EditProduct />} />
                <Route path="products/:recordsPerPage/:pageNumber/" element={<Products />} />
                <Route path="products/reviews/:productId/" element={<Reviews />} />

                {/* Categories Routes */}
                <Route path="categories" element={<Categories />} />
                <Route path="categories/add" element={<AddCategory />} />
                <Route path="categories/edit/:id/:rows/:page/" element={<EditCategory />} />
                <Route path="categories/:recordsPerPage/:pageNumber/" element={<Categories />} />

                {/* Brands Routes */}
                <Route path="brands" element={<Brands />} />
                <Route path="brands/add" element={<AddBrand />} />
                <Route path="brands/edit/:id/:rows/:page/" element={<EditBrand />} />
                <Route path="brands/:recordsPerPage/:pageNumber/" element={<Brands />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes >
    );


}

export default AppRoutes;