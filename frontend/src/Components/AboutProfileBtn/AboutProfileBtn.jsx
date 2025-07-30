import { Link } from "react-router-dom";
import { useGetAboutUsQuery } from "../../Redux/about/aboutApi";

export default function AboutProfileBtn() {
  const { data } = useGetAboutUsQuery();
  const about = data?.data;

  return (
    <Link
      to={`${import.meta.env.VITE_BACKEND_URL}/${about?.profileDoc}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="primary_btn">Download Ruper Bangla Profile</button>
    </Link>
  );
}
