import PageLayout from "../components/PageLayout/PageLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Permission from "../pages/Permission/Permission";
import Role from "../pages/Role/Role";
import User from "../pages/User/User";
import PrivateGard from "./PrivateGard"

// Private Router
const privateRouter = [
    {
        element: <PageLayout />,
        children: [
            {
                element: <PrivateGard />,
                children: [
                    {
                        path: "/",
                        element: <Dashboard />
                    },
                    {
                        path: "/users",
                        element: <User />
                    },
                    {
                        path: "/role",
                        element: <Role />
                    },
                    {
                        path: "/permission",
                        element: <Permission />
                    },
                ],
            }
        ]
    }
    
];



// export
export default privateRouter;