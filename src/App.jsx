import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Images from "./pages/Images";
import Error from "./pages/Error";
import Icons from "./pages/Icons";

export default function App() {

    const ROUTER = createBrowserRouter([{
        path: "/",
        element: <Menu/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/icons", element: <Icons/>},
            {path: "/images", element: <Images/>},
            {path: "*", element: <Error/>},
        ]
    }])

    return <RouterProvider router={ROUTER}/>;
}
