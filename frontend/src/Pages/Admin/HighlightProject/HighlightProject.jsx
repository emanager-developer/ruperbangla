import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetHighlightProjectQuery,
  useCreateHighlightProjectMutation,
  useUpdateHighlightProjectMutation,
} from "../../../Redux/highlightProject/highlightProjectApi.js"; 

export default function HighlightProject() {
  const editor = useRef(null);

  const { data: projectData, isLoading } = useGetHighlightProjectQuery();
  const projectId = projectData?.data?._id;

  const [createHighlightProject, { isLoading: isCreating }] = useCreateHighlightProjectMutation();
  const [updateHighlightProject, { isLoading: isUpdating }] = useUpdateHighlightProjectMutation();

  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (projectData?.data) {
      setTitle(projectData.data.title);
      setDescription(projectData.data.description);
      setImage([{ data_url: `${import.meta.env.VITE_BACKEND_URL}${projectData.data.image}` }]);
    }
  }, [projectData]);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    const img = image[0]?.file;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (img) formData.append("image", img);

    try {
      let response;
      if (projectId) {
        response = await updateHighlightProject({ id: projectId, formData }).unwrap();
      } else {
        response = await createHighlightProject(formData).unwrap();
      }

      if (response.success) {
        setImage([]);
        Swal.fire("", projectId ? "Project updated successfully!" : "Project created successfully!", "success");
      }
    } catch (error) {
      Swal.fire("", error.message || "Something went wrong!", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Highlight Project</h3>
      </div>

      <form className="p-4" onSubmit={handleProjectSubmit}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                className="border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <div>
                <p className="mb-1">Image</p>
                <div>
                  <ImageUploading
                    value={image}
                    onChange={(icn) => setImage(icn)}
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload, onImageRemove, dragProps }) => (
                      <div className="rounded border border-dashed p-4" {...dragProps}>
                        <div className="flex items-center gap-2">
                          <span
                            onClick={onImageUpload}
                            className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                          >
                            Choose Image
                          </span>

                          <p className="text-neutral-content">or Drop here</p>
                        </div>

                        <div className={`${image?.length > 0 && "mt-4"} `}>
                          {image?.map((img, index) => (
                            <div key={index} className="image-item relative">
                              <img
                                src={img["data_url"]}
                                alt=""
                                className="h-20 w-20"
                              />
                              <div
                                onClick={() => onImageRemove(index)}
                                className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                              >
                                <AiFillDelete />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded border md:col-span-2">
            <p className="border-b p-3">Description</p>
            <div className="about_details p-4">
              <JoditEditor
                ref={editor}
                value={description}
                onBlur={(newDescription) => setDescription(newDescription)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="admin_btn" type="submit" disabled={isCreating || isUpdating}>
            {projectId ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </section>
  );
}
