import { lazy, Suspense } from "react";
import AdminLayout from "../Layout/AdminLayout";
import Spinner from "../Components/Spinner/Spinner";
import AllCategories from "../Pages/Admin/Category/Categories/AllCategories";
import Editcategory from "../Pages/Admin/Category/Categories/Editcategory";
import AddCategory from "../Pages/Admin/Category/Categories/AddCategory";
import MessageFromChairman from "../Pages/Admin/MessageFromChairman/MessageFromChairman";
import MessageFromMd from "../Pages/Admin/MessageFromMd/MessageFromMd";
import AllMoreAboutUs from "../Pages/Admin/MoreAbout/AllMoreAbout";
import AddMoreAbout from "../Pages/Admin/MoreAbout/AddMoreAbout";
import EditMoreAbout from "../Pages/Admin/MoreAbout/EditMoreAbout";
import AllBanner from "../Pages/Admin/FrontEndSetting/Banner/AllBanner";
import AddBanner from "../Pages/Admin/FrontEndSetting/Banner/AddBanner";
import EditBanner from "../Pages/Admin/FrontEndSetting/Banner/EditBanner";

// Lazy loading the components
const About = lazy(() => import("../Pages/Admin/AboutUs/AboutUs"));
const AddAdministrator = lazy(
  () => import("../Pages/Admin/Administrator/AddAdministrator"),
);
const Administrator = lazy(
  () => import("../Pages/Admin/Administrator/Administrator"),
);
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard/Dashboard"));
const AddProject = lazy(() => import("../Pages/Admin/Projects/AddProject"));
const EditProject = lazy(() => import("../Pages/Admin/Projects/EditProject"));
const ProjectList = lazy(() => import("../Pages/Admin/Projects/ProjectList"));
const ContactUs = lazy(() => import("../Pages/Admin/ContactUs/ContactUs"));
const HighlightProject = lazy(
  () => import("../Pages/Admin/HighlightProject/HighlightProject"),
);
const Favicon = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Favicon/Favicon"),
);
const Logo = lazy(() => import("../Pages/Admin/FrontEndSetting/Logo/Logo"));
const Gallery = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Gallery/Gallery"),
);
const BusinessInfo = lazy(
  () => import("../Pages/Admin/GeneralSetting/BusinessInfo/BusinessInfo"),
);
const SEO = lazy(() => import("../Pages/Admin/SEO/SEO"));
const FeaturesProjectList = lazy(
  () => import("../Pages/Admin/FeaturesProject/FeaturesProjectList"),
);
const AddFeaturesProject = lazy(
  () => import("../Pages/Admin/FeaturesProject/AddFeaturesProject"),
);
const EditFeaturesProject = lazy(
  () => import("../Pages/Admin/FeaturesProject/EditFeaturesProject"),
);
const PrivacyPolicy = lazy(
  () => import("../Pages/Admin/PrivacyPolicy/PrivacyPolicy"),
);
const WhyChooseSection = lazy(
  () => import("../Pages/Admin/WhyChoose/WhyChooseSection"),
);
const WhyChooseCards = lazy(
  () => import("../Pages/Admin/WhyChoose/WhyChooseCards"),
);
const AddWhyChooseCard = lazy(
  () => import("../Pages/Admin/WhyChoose/AddWhyChooseCard"),
);
const AddGallery = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Gallery/AddGallery"),
);
const DirectorList = lazy(() => import("../Pages/Admin/Director/DirectorList"));
const AddDirector = lazy(() => import("../Pages/Admin/Director/AddDirector"));
const EditDirector = lazy(() => import("../Pages/Admin/Director/EditDirector"));
const ContactMsgList = lazy(
  () => import("../Pages/Admin/ContactMsg/ContactMsgList"),
);
const ContactMsgDetail = lazy(
  () => import("../Pages/Admin/ContactMsg/ContactMsgDetail"),
);
const AdminRoute = lazy(() => import("../AdminRoute/AdminRoute"));
const AllServices = lazy(
  () => import("../Pages/Admin/Service/Services/AllServices"),
);
const AddService = lazy(
  () => import("../Pages/Admin/Service/Services/AddService"),
);
const Counter = lazy(() => import("../Pages/Admin/Counter/Counter"));
const EditService = lazy(
  () => import("../Pages/Admin/Service/Services/EditService"),
);

export const adminRoutes = {
  path: "/admin",
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    </Suspense>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "category/categories",
      element: <AllCategories />,
    },
    {
      path: "category/add-category",
      element: <AddCategory />,
    },
    {
      path: "category/edit/:id",
      element: <Editcategory />,
    },
    {
      path: "project/all",
      element: <ProjectList />,
    },
    {
      path: "project/add",
      element: <AddProject />,
    },
    {
      path: "project/edit/:id",
      element: <EditProject />,
    },
    {
      path: "featuresProject/all",
      element: <FeaturesProjectList />,
    },
    {
      path: "featuresProject/add",
      element: <AddFeaturesProject />,
    },
    {
      path: "featuresProject/edit/:id",
      element: <EditFeaturesProject />,
    },
    {
      path: "message-from-chairman",
      element: <MessageFromChairman />,
    },
    {
      path: "message-from-md",
      element: <MessageFromMd />,
    },
    {
      path: "director/all",
      element: <DirectorList />,
    },
    {
      path: "director/add",
      element: <AddDirector />,
    },
    {
      path: "director/edit/:id",
      element: <EditDirector />,
    },
    {
      path: "front-end/banner/all",
      element: <AllBanner />,
    },
    {
      path: "front-end/banner/add",
      element: <AddBanner />,
    },
    //----counter routes
    {
      path: "counter",
      element: <Counter />,
    },

    {
      path: "front-end/banner/edit/:id",
      element: <EditBanner />,
    },
    {
      path: "front-end/favicon",
      element: <Favicon />,
    },
    {
      path: "front-end/logo",
      element: <Logo />,
    },
    {
      path: "front-end/gallery",
      element: <Gallery />,
    },
    {
      path: "front-end/gallery/add",
      element: <AddGallery />,
    },
    {
      path: "general-setting/business-info",
      element: <BusinessInfo />,
    },
    {
      path: "seo",
      element: <SEO />,
    },
    {
      path: "service/all",
      element: <AllServices />,
    },
    {
      path: "service/add",
      element: <AddService />,
    },
    {
      path: "service/edit/:id",
      element: <EditService />,
    },
    {
      path: "privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "administrator/all",
      element: <Administrator />,
    },
    {
      path: "administrator/add",
      element: <AddAdministrator />,
    },
    {
      path: "about-us",
      element: <About />,
    },
    {
      path: "about/more/all",
      element: <AllMoreAboutUs />,
    },
    {
      path: "about/more/add",
      element: <AddMoreAbout />,
    },
    {
      path: "about/more/edit/:id",
      element: <EditMoreAbout />,
    },
    {
      path: "highlightProject",
      element: <HighlightProject />,
    },
    {
      path: "contact-us",
      element: <ContactUs />,
    },
    {
      path: "contact-msg",
      element: <ContactMsgList />,
    },
    {
      path: "contact-msg/:id",
      element: <ContactMsgDetail />,
    },
    {
      path: "whyChoose/section",
      element: <WhyChooseSection />,
    },
    {
      path: "whyChoose/cards/all",
      element: <WhyChooseCards />,
    },
    {
      path: "whyChoose/cards/add",
      element: <AddWhyChooseCard />,
    },
  ],
};
