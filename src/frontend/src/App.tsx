import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import Archives from "./pages/Archives";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Office from "./pages/Office";
import WorkDetail from "./pages/WorkDetail";
import Works from "./pages/Works";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const worksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/works",
  component: Works,
});
const workDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/works/$id",
  component: WorkDetail,
});
const officeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/office",
  component: Office,
});
const archivesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/archives",
  component: Archives,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  worksRoute,
  workDetailRoute,
  officeRoute,
  archivesRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export { Link, useRouterState };
