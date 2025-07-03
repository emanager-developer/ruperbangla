import { useEffect } from "react";
import About from "../../../Components/Home/About/About";
import { useGetDirectorQuery } from "../../../Redux/director/directorApi";
import parse from "html-react-parser";
import MessageFromChairman from "../../../Components/MessageFromChairman/MessageFromChairman";
import MessageFromMd from "../../../Components/MessageFromMd/MessageFromMd";
import MoreAbout from "../../../Components/MoreAbout/MoreAbout";

export default function Aboutus() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us - GHL";
  }, []);

  const { data } = useGetDirectorQuery();
  const directors = data?.data;

  return (
    <section>
      <About />
      <MoreAbout />
      <MessageFromChairman />
      <MessageFromMd />

      <section className="py-10">
        <div className="container">
          <h2 className="text-center text-3xl font-medium">
            Board of Directors
          </h2>
          <div className="mt-5 grid gap-y-2 md:mt-8 md:grid-cols-2 md:gap-6">
            {directors?.map((director) => (
              <div key={director?._id} className="text-center">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${director?.image}`}
                  alt={director?.designation}
                  className="w-full rounded object-cover md:h-[450px]"
                />
                <h4 className="mt-4 text-lg font-medium">{director?.name}</h4>
                <p className="text-sm text-neutral-content">
                  {director?.designation}
                </p>
                <div className="mt-2.5 text-neutral-content">
                  {director?.description && parse(director?.description)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
