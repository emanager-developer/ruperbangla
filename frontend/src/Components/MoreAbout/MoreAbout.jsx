import { useGetMoreAboutQuery } from "../../Redux/about/moreAboutApi";
import parser from "html-react-parser";

export default function MoreAbout() {
  const { data } = useGetMoreAboutQuery();
  const moreAbout = data?.data;

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-col gap-8">
          {moreAbout?.map((about) => (
            <div key={about?._id}>
              <h2 className="text-3xl font-medium">{about?.title}</h2>
              <div className="mt-4">
                {about?.description && parser(about?.description)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
