import { Link } from "react-router-dom";
import { useGetAllServiceQuery } from "../../Redux/service/serviceApi";

export default function Services() {
  const { data } = useGetAllServiceQuery();
  const services = data?.data;

  return (
    <section className="py-14 bg-gray-100">
      <div className="container">
        <h2 className="mx-auto text-center text-3xl font-semibold sm:w-2/3 sm:text-5xl text-gray-800">
          Services of Ruper Bangla
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service, i) => {
            const description =
              service?.description &&
              service?.description.replace(/<[^>]+>/g, "");

            return (
              <Link
                to={`/service/${service?._id}`}
                key={i}
                className="rounded-xl bg-white text-center p-6 shadow hover:shadow-md transition duration-300 border border-transparent hover:border-primary"
                data-aos="zoom-in"
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${service?.image}`}
                  alt={service?.title}
                  className="mx-auto w-20 h-20 object-contain mb-5"
                  loading="lazy"
                />

                <h3 className="text-lg font-bold text-green-600 mb-2">
                  {service?.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {description?.length > 100
                    ? description.slice(0, 100) + "..."
                    : description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
