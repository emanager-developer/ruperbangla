import parser from "html-react-parser";
import { useGetHighlightProjectQuery } from "../../../Redux/highlightProject/highlightProjectApi";
import { motion } from "framer-motion";

export default function ProjectHighlight() {
  const { data } = useGetHighlightProjectQuery();
  const highlightProject = data?.data;
  const description =
    highlightProject?.description && parser(highlightProject?.description);

  const bgImageUrl = `${import.meta.env.VITE_BACKEND_URL}/${highlightProject?.image}`;

  return (
    <section
      className="bg-cover bg-fixed bg-center bg-no-repeat py-14 text-white sm:py-24"
      style={{
        backgroundImage: `linear-gradient(90deg, #000000bb, #000000bb), url('${bgImageUrl}')`,
      }}
    >
      <div className="container">
        <div className="flex justify-center text-center">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
              {highlightProject?.title}
            </h2>

            <div className="text-sm leading-relaxed text-gray-200 md:text-base">
              {description}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
