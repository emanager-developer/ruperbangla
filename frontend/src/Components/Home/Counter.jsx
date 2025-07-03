import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useGetCounterQuery } from "../../Redux/counter/counterApi";

export default function Counter() {
  const [count, setCount] = useState(false);
  const { data } = useGetCounterQuery();
  const counter = data?.data;

  return (
    <section
      className="py-10 text-base-100 sm:py-20"
      style={{
        backgroundImage: `linear-gradient(80deg, #0000009a, #0000009a),url(${import.meta.env.VITE_BACKEND_URL}/${counter?.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div>
          <h2 className="fade-up-animation mb-10 text-center text-4xl font-bold text-base-100">
            Our Success Stories
          </h2>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
            {counter?.counts?.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 text-center"
              >
                <ScrollTrigger
                  onEnter={() => setCount(true)}
                  onExit={() => setCount(false)}
                >
                  {count && (
                    <h2 className="text-2xl font-semibold sm:text-4xl">
                      <CountUp start={0} end={item?.number} />+
                    </h2>
                  )}
                </ScrollTrigger>
                <p className="text-base text-gray-300">{item?.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
