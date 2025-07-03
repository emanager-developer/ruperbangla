import { useGetMFChairmanQuery } from "../../Redux/director/mfChairman";
import parser from "html-react-parser";

export default function MessageFromChairman() {
  const { data } = useGetMFChairmanQuery();
  const mfChairman = data?.data;

  return (
    <section className="bg-slate-50 py-10">
      <div className="container">
        <h2 className="text-center text-3xl font-medium">
          Message From Chairman
        </h2>

        <div className="mt-8">
          <div className="grid items-start gap-10 sm:grid-cols-2">
            <div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${mfChairman?.image}`}
                alt="chairman"
                className="mx-auto w-[80%]"
              />
            </div>

            <div>
              <h2 className="text-2xl font-medium">{mfChairman?.name}</h2>
              <div className="mt-2">
                {mfChairman?.message && parser(mfChairman?.message)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
