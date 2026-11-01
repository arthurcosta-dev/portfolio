import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Spinner from "../ui/Spinner";
import Footer from "./Footer";
import Header from "./Header";

const PageFallback = () => (
  <div
    role="status"
    aria-label="Carregando página"
    className="text-acento-claro flex min-h-[60svh] items-center justify-center"
  >
    <Spinner />
  </div>
);

const Layout = () => (
  <div className="flex min-h-svh flex-col overflow-x-clip">
    <Header />
    <main className="flex-1">
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <ScrollRestoration />
  </div>
);

export default Layout;
