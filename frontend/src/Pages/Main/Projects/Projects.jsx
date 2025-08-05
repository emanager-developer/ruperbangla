import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../../../Redux/projects/projectsApi";
import parse from "html-react-parser";

const truncateDescription = (description, maxLength = 100) => {
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const plainText = stripHtmlTags(description);
  const truncatedText =
    plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;

  return truncatedText;
};

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Projects - Ruper Bangla";
  }, []);

  const { type } = useParams();

  const projectCategory = type;

  const { data } = useGetProjectsQuery();
  const projects = data?.data;

  const filteredProjects = projects?.filter(
    (project) => project?.category?.slug === projectCategory,
  );

  return (
    <section className="py-5 sm:py-10">
      <div className="container">
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects?.map((project) => (
            <Link
              key={project?._id}
              to={`/project/${project?._id}`}
              className="project_card"
            >
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${project?.image}`}
                  className="h-full w-full object-cover"
                  alt="project"
                />
              </div>

              <div className="pt-3">
                <h2 className="text-2xl font-medium">{project?.title}</h2>
                <p className="mt-2 text-sm text-neutral-content">
                  {parse(truncateDescription(project?.description, 100))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
