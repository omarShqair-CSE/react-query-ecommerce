import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Product from "../Components/Product/Product";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Cart from "../Pages/Cart/Cart";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/cart', element: <Cart /> },
            { path: '/*', element: <PageNotFound /> }
        ]
    }
]);
export default router