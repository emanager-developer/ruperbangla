import { useGetAboutUsQuery } from "../../../Redux/about/aboutApi";
import parse from "html-react-parser";
import { motion } from "framer-motion";

export default function About() {
  const { data } = useGetAboutUsQuery();
  const about = data?.data;
  const description = about?.description && parse(about?.description);

  return (
    <section className="bg-slate-50 py-10 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 items-center gap-10">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${about?.image}`}
              alt="about"
              className="mx-auto w-full max-w-md sm:max-w-full rounded shadow-md"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <p className="text-sm text-primary font-medium">{about?.heading}</p>

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-neutral">
              {about?.title}
            </h2>

            <h3 className="mt-2 text-xl sm:text-2xl text-neutral font-semibold">
              {about?.subTitle}
            </h3>

            <div className="mt-4 text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
              {description}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
