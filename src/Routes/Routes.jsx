import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Product from "../Components/Product/Product";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Cart from "../Pages/Cart/Cart";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import ProtectedRouter from "../Protected/ProtectRouter";
import ProductDetails from "../Components/Product/ProductDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, element:
                    <ProtectedRouter>
                        < Home />
                    </ProtectedRouter>

            },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            {
                path: '/cart', element:
                    <ProtectedRouter>
                        <Cart />
                    </ProtectedRouter>
            },
            {
                path: '/product/:id', element:
                    <ProtectedRouter>
                        <ProductDetails />
                    </ProtectedRouter>
            },
            { path: '', element: <PageNotFound /> }
        ]
    }
]);
export default router