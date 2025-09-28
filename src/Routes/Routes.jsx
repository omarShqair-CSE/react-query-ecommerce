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
import PublicRouter from "../Protected/PublicRouter";
import Checkout from "../Pages/Chekout/Checkout";

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
            {
                path: '/login', element:
                    <PublicRouter>
                        <Login />
                    </PublicRouter>
            },
            {
                path: '/register', element:
                    <PublicRouter>
                        <Register />
                    </PublicRouter>
            },
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
            {
                path: '/checkout', element:
                    <ProtectedRouter>
                        <Checkout />
                    </ProtectedRouter>
            },
            { path: '*', element: <PageNotFound /> }
        ]
    }
]);
export default router