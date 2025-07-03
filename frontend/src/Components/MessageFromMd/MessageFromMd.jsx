import parser from "html-react-parser";
import { useGetMFMdQuery } from "../../Redux/director/mfMd";

export default function MessageFromMd() {
  const { data } = useGetMFMdQuery();
  const mfMd = data?.data;

  return (
    <section className="bg-slate-50 py-10">
      <div className="container">
        <h2 className="text-center text-3xl font-medium">Message From MD</h2>

        <div className="mt-8">
          <div className="grid items-start gap-10 sm:grid-cols-2">
            <div className="text-end">
              <h2 className="text-2xl font-medium">{mfMd?.name}</h2>
              <div className="mt-2">
                {mfMd?.message && parser(mfMd?.message)}
              </div>
            </div>

            <div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${mfMd?.image}`}
                alt="Md"
                className="mx-auto w-[80%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
