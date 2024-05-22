import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Forgot from "../pages/Auth/Forgot";
import PublicGard from "./PublicGard";

// Public Router
const publicRouter = [
    {
        element: <PublicGard />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/forgot",
                element: <Forgot />
            },
        ]
    }
];



// export
export default publicRouter;