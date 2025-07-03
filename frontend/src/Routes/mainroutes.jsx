import { lazy, Suspense } from "react";
import MainLayout from "../Layout/MainLayout";
import Spinner from "../Components/Spinner/Spinner";
import Home from "../Pages/Main/Home/Home";

// Lazy loading the components
const Aboutus = lazy(() => import("../Pages/Main/Aboutus/Aboutus"));
const Contactus = lazy(() => import("../Pages/Main/Contactus/Contactus"));
const PrivacyPolicy = lazy(
  () => import("../Pages/Main/PrivacyPolicy/PrivacyPolicy"),
);
const ProjectDetails = lazy(
  () => import("../Pages/Main/ProjectDetails/ProjectDetails"),
);
const Projects = lazy(() => import("../Pages/Main/Projects/Projects"));

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/projects/:type",
      element: (
        <Suspense fallback={<Spinner />}>
          <Projects />
        </Suspense>
      ),
    },
    {
      path: "/project/:id",
      element: (
        <Suspense fallback={<Spinner />}>
          <ProjectDetails />
        </Suspense>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Suspense fallback={<Spinner />}>
          <Aboutus />
        </Suspense>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <Suspense fallback={<Spinner />}>
          <Contactus />
        </Suspense>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <Suspense fallback={<Spinner />}>
          <PrivacyPolicy />
        </Suspense>
      ),
    },
  ],
};
