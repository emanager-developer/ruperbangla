import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "../../../Redux/projects/projectsApi";
import parse from "html-react-parser";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function ProjectDetails() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProjectByIdQuery(id);
  const project = data?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = project?.title || "Project Details - Ruper Bangla";
  }, [project]);

  if (error) {
    return <div>Error loading project details.</div>;
  }

  if (isLoading) return <div className="container py-10">Loading...</div>;

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid items-start gap-4 md:grid-cols-2 md:gap-10">
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${project?.image}`}
              alt="project"
            />
          </div>

          <div>
            <h2 className="text-4xl font-medium uppercase text-neutral md:text-5xl">
              {project?.title}
            </h2>
            <p className="mt-2 text-xs text-neutral-content md:text-sm">
              {project?.description && parse(project?.description)}
            </p>
          </div>
        </div>

        <div className="mt-10 sm:mt-20">
          <h2 className="text-2xl font-medium text-neutral">Photo Gallery</h2>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <PhotoProvider>
              {project?.gallery &&
                project?.gallery?.map((img, index) => (
                  <PhotoView
                    key={img?._id}
                    src={`${import.meta.env.VITE_BACKEND_URL}/${img}`}
                  >
                    <img
                      key={index}
                      src={`${import.meta.env.VITE_BACKEND_URL}/${img}`}
                      alt={`gallery ${index}`}
                      className="w-full rounded"
                    />
                  </PhotoView>
                ))}
            </PhotoProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
