import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetContactsQuery } from "../../Redux/contact/contactApi";

export default function SidebarMenu({
  showSidebar,
  setShowSidebar,
  allCategory,
}) {
  const { data } = useGetContactsQuery();

  const contactUs = data?.data;

  return (
    <div className={`sidebar_menu ${showSidebar && "active"}`}>
      <div className="flex justify-end">
        <button
          onClick={() => setShowSidebar(false)}
          className="header_menu_btn"
        >
          <MdOutlineClose />
        </button>
      </div>

      <div className="mt-6 grid md:grid-cols-2">
        <ul className="flex flex-col gap-3 text-lg">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          {allCategory?.map((category) => (
            <li key={category.id}>
              <Link to={`/projects/${category?.slug}`}>{category.name}</Link>
            </li>
          ))}
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>

        <div className="hidden md:block">
          <h2 className="text-2xl">Contact Us</h2>
          <ul className="mt-2 flex flex-col gap-3">
            <li>
              <Link to="/" className="flex items-start gap-2 text-neutral">
                <p>
                  <FaMapMarkerAlt className="mt-1.5 text-[17px]" />
                </p>
                <p>{contactUs?.address}</p>
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-start gap-2 text-neutral">
                <p>
                  <MdEmail className="mt-1 text-base" />
                </p>
                <p>{contactUs?.email}</p>
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-start gap-2 text-neutral">
                <p>
                  <FaPhone className="mt-1 text-sm" />
                </p>
                <p>{contactUs?.phone}</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
