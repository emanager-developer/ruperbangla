import parser from "html-react-parser";
import { useGetFeatureProjectsQuery } from "../../../Redux/featureProject/featureProjectApi";
import { motion } from "framer-motion";

export default function Features() {
  const { data } = useGetFeatureProjectsQuery();
  const projects = data?.data;

  return (
    <section className="py-14 bg-gray-50">
      <div className="container">
        <div className="mb-10 text-center text-neutral">
          <h2 className="text-2xl font-medium md:text-3xl">Explore our latest</h2>
          <h2 className="text-4xl md:text-6xl font-bold">Achievements</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects?.map((project, i) => (
            <motion.div
              key={project?._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${project?.image}`}
                alt={project?.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  {project?.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 text-sm font-medium text-blue-600 mb-3">
                  {project?.tags?.map((tag, i) => (
                    <span key={i} className="hover:underline cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="text-gray-600 text-sm leading-relaxed">
                  {parser(project?.description)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
