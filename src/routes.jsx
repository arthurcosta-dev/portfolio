import { lazy } from "react";
import AuthLayout from "./components/admin/AuthLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import RouteError from "./pages/RouteError";

const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

export const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { index: true, element: <Home /> },
          { path: "projetos", element: <Projects /> },
          { path: "projetos/:nome", element: <ProjectDetail /> },
          {
            element: <AuthLayout />,
            children: [
              { path: "login", element: <Login /> },
              {
                element: <ProtectedRoute />,
                children: [{ path: "admin", element: <Admin /> }],
              },
            ],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];
