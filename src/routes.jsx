import { lazy } from "react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import RouteError from "./pages/RouteError";

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
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];
