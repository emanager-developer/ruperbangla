import { Link } from "react-router-dom";

import {
  MdMonitor,
  MdOutlineDashboard,
  MdContactPhone,
  MdHighlight,
  MdFeaturedPlayList,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { ImSortNumbericDesc } from "react-icons/im";
import { RiAdminFill, RiBarChartHorizontalFill } from "react-icons/ri";
import { FaChartLine, FaPhotoVideo } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

import SidebarItems from "./SidebarItems";
import { useGetLogosQuery } from "../../../Redux/logo/logoApi";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashboard",
    path: "/admin/dashboard",
  },

  {
    icon: <RiBarChartHorizontalFill />,
    title: "Project",
    subMenu: [
      {
        title: "Categories",
        path: "/admin/category/categories",
      },
      {
        title: "All Projects",
        path: "/admin/project/all",
      },
    ],
  },

  {
    icon: <MdDesignServices />,
    title: "Service",
    subMenu: [
      {
        title: "Services",
        path: "/admin/service/all",
      },
    ],
  },

  {
    icon: <MdHighlight />,
    title: "Highlight Project",
    path: "/admin/highlightProject",
  },

  {
    icon: <ImSortNumbericDesc />,
    title: "Counter",
    path: "/admin/counter",
  },
  {
    icon: <FaPhotoVideo />,
    title: "Gallery",
    subMenu: [
      {
        title: "Photo Gallery",
        path: "/admin/gallery/photo/all",
      },
      {
        title: "Video Gallery",
        path: "/admin/gallery/video/all",
      },
    ],
  },
  {
    icon: <MdFeaturedPlayList />,
    title: "Features Projects",
    path: "/admin/featuresProject/all",
  },
  {
    icon: <CgProfile />,
    title: "Director",
    subMenu: [
      {
        title: "All Directors",
        path: "/admin/director/all",
      },
      {
        title: "Message From Chairman",
        path: "/admin/message-from-chairman",
      },
      {
        title: "Message From MD",
        path: "/admin/message-from-md",
      },
    ],
  },

  {
    icon: <RiBarChartHorizontalFill />,
    title: "Why Choose Us",
    subMenu: [
      {
        title: "Why Choose Us Section",
        path: "/admin/whyChoose/section",
      },
      {
        title: "Why Choose Us Cards",
        path: "/admin/whyChoose/cards/all",
      },
    ],
  },

  {
    icon: <FcAbout />,
    title: "About",
    subMenu: [
      {
        title: "About Us",
        path: "/admin/about-us",
      },
      {
        title: "More About",
        path: "/admin/about/more/all",
      },
    ],
  },

  {
    icon: <MdContactPhone />,
    title: "Contact Us",
    path: "/admin/contact-us",
  },
  {
    icon: <CiMail />,
    title: "Client Message",
    path: "/admin/contact-msg",
  },

  {
    icon: <MdMonitor />,
    title: "Front-End Setting",
    subMenu: [
      {
        title: "Logo",
        path: "/admin/front-end/logo",
      },
      {
        title: "Favicon",
        path: "/admin/front-end/favicon",
      },
      {
        title: "Banner",
        path: "/admin/front-end/banner/all",
      },
    ],
  },
  {
    icon: <RiAdminFill />,
    title: "Administrator",
    path: "/admin/administrator/all",
  },
  {
    icon: <IoMdSettings />,
    title: "General Setting",
    subMenu: [
      {
        title: "Business Info",
        path: "/admin/general-setting/business-info",
      },
    ],
  },

  {
    icon: <FaChartLine />,
    title: "SEO Setting",
    path: "/admin/seo",
  },
  {
    icon: <MdOutlinePrivacyTip />,
    title: "Privacy Policy",
    path: "/admin/privacy-policy",
  },
];

export default function AdminSidebar() {
  const { data } = useGetLogosQuery();
  const logo = data?.data;

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <nav className="admin_sidebar">
          <Link to="/admin/dashboard" className="block py-3">
            <img
              className="mx-auto w-3/5"
              src={`${import.meta.env.VITE_BACKEND_URL}/${logo?.logo}`}
              alt="Logo"
            />
          </Link>

          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems item={item} key={i} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
