import { Link, NavLink } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import SidebarMenu from "./SidebarMenu";
import { useEffect, useState } from "react";
import { useGetLogosQuery } from "../../Redux/logo/logoApi";
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";

export default function Header() {
  const { data } = useGetLogosQuery();
  const logo = data?.data;

  const [showSidebar, setShowSidebar] = useState(false);

  const { data: categories } = useGetCategoriesQuery();
  const allCategory = categories?.data;

  useEffect(() => {
    if (showSidebar) {
      document.addEventListener("click", (e) => {
        if (
          (!e.target.closest(".header_menu_btn") &&
            !e.target.closest(".sidebar_menu")) ||
          e.target.closest(".sidebar_menu a")
        ) {
          setShowSidebar(false);
        }
      });
    }
  }, [showSidebar]);

  return (
    <header className="relative top-0 z-40 bg-[#ffffff9c] pt-2">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${logo?.logo}`}
              alt="logo"
              className="max-w-40 max-h-24 py-2 md:max-w-[200px] object-cover"
            />
          </Link>

          <nav>
            <ul className="flex items-center gap-6">
              <li className="hidden sm:block">
                <Link to="/" className="text-primary">
                  Home
                </Link>
              </li>
              {allCategory?.map((category) => {
                return (
                  <li className="hidden sm:block" key={category.id}>
                    <Link
                      to={`/projects/${category?.slug}`}
                      className="text-primary"
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}

              <li className="hidden sm:block">
                <Link to="/about-us" className="text-primary">
                  About Us
                </Link>
              </li>

               <li className="hidden sm:block">
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow"
                      : "bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
                  }
                >
                  Contact Us
                </NavLink>
              </li>

              <li className="sm:hidden">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="header_menu_btn"
                >
                  <RiMenu3Fill />
                </button>

                <SidebarMenu
                  allCategory={allCategory}
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
