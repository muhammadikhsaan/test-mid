import { FunctionComponent, memo, useContext } from "react";
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { SessionContext } from "@shared/context/Session.context";
import { AuthPage } from "./auth/Auth.page";
import { AwardPage } from "./award/Award.page";

const routes = (isLogin: boolean) : RouteObject[] => [
  {
    path: "/",
    element: <Outlet />,
    errorElement: <div> 404 </div>,
    children: [
      {
        index: true,
        element: isLogin ? <Navigate replace to="/award" /> : <Navigate replace to="/login" />,
      },
      {
        path: "/login",
        element: <AuthPage />,
      },
      {
        path: "/award",
        element: isLogin ? <AwardPage /> : <Navigate replace to="/login" />,
      },
    ],
  },
];

const MainRoutes: FunctionComponent = memo(() => {
  const [{ login }] = useContext(SessionContext);

  const router = createBrowserRouter(routes(login));

  return <RouterProvider router={router} />;
});

export default MainRoutes;
