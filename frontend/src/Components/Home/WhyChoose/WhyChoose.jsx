import { useGetWhychooseQuery } from "../../../Redux/whychoose/whychooseApi";
import { useGetWhychooseSectionQuery } from "../../../Redux/whychooseSection/whychooseSectionApi";

export default function WhyChoose() {
  const { data } = useGetWhychooseSectionQuery();
  const section = data?.data;
  const { data: whychoose } = useGetWhychooseQuery();
  const whychooses = whychoose?.data;

  return (
    <section className="bg-slate-100 py-10 md:py-16">
      <div className="container">
        <h2 className="mx-auto w-72 text-center text-3xl md:text-5xl font-medium text-neutral md:w-[550px]">
          {section?.title}
        </h2>
        <div className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {whychooses?.map((whychoose) => (
              <img
                key={whychoose?._id}
                src={`${import.meta.env.VITE_BACKEND_URL}/whychoose/${whychoose?.image}`}
                alt="img"
                title={whychoose?.image}
                className="h-48 w-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
