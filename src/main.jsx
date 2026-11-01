import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { queryClient } from "./queryClient";
import ThemeProvider from "./context/ThemeProvider";
import "./index.css";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
