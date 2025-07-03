import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { useAddProjectMutation } from "../../../Redux/projects/projectsApi";

export default function AddProject() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [image, setImage] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [description, setDescription] = useState("");

  const [addProject, { isLoading }] = useAddProjectMutation();

  const { data: categories } = useGetCategoriesQuery();

  const allCategory = categories?.data;

  const handleAddProject = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const location = e.target.location.value;
    const category = e.target.category.value;

    if (image?.length <= 0) {
      return Swal.fire("", "Main image is required", "warning");
    }
    if (gallery?.length <= 0) {
      return Swal.fire("", "Gallery images are required", "warning");
    }
    if (description === "") {
      return Swal.fire("", "Project description is required", "warning");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("mainImage", image[0].file);

    gallery.forEach((img, index) => {
      formData.append(`galleryImages`, img.file);
    });

    try {
      const res = await addProject(formData).unwrap();
      if (res?.success) {
        Swal.fire("", "Project added successfully", "success");
        e.target.reset();
        setImage([]);
        setGallery([]);
        setDescription("");
        navigate("/admin/project/all");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("", "Something went wrong!", "error");
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Add Project</h3>
      </div>

      <form className="p-4" onSubmit={handleAddProject}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" required />
            </div>
            <div>
              <p className="mb-1">Category</p>
              <select name="category" required>
                {allCategory?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Location</p>
              <input type="text" name="location" required />
            </div>

            <div>
              <p className="mb-1">Main Image</p>
              <div>
                <ImageUploading
                  value={image}
                  onChange={(icn) => setImage(icn)}
                  dataURLKey="data_url"
                  maxNumber={1}
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="rounded border border-dashed p-4"
                      {...dragProps}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          onClick={onImageUpload}
                          className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                        >
                          Choose Image
                        </span>
                        <p className="text-neutral-content">or Drop here</p>
                      </div>

                      {image?.length > 0 && (
                        <div className="mt-4">
                          <img
                            src={image[0]["data_url"]}
                            alt=""
                            className="w-24"
                          />
                          <div
                            onClick={() => onImageRemove(0)}
                            className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                          >
                            <AiFillDelete />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ImageUploading>
              </div>
            </div>

            <div>
              <p className="mb-1">Gallery Images</p>
              <div>
                <ImageUploading
                  value={gallery}
                  onChange={(icn) => setGallery(icn)}
                  dataURLKey="data_url"
                  multiple
                  maxNumber={10}
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="rounded border border-dashed p-4"
                      {...dragProps}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          onClick={onImageUpload}
                          className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                        >
                          Choose Images
                        </span>
                        <p className="text-neutral-content">or Drop here</p>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {gallery?.map((img, index) => (
                          <div key={index} className="image-item relative">
                            <img
                              src={img["data_url"]}
                              alt=""
                              className="w-full"
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

          <div className="rounded border md:col-span-2">
            <p className="border-b p-3">Project Description</p>
            <div className="about_details p-4">
              <JoditEditor
                ref={editor}
                value={description}
                onBlur={(text) => setDescription(text)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="admin_btn" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Project"}
          </button>
        </div>
      </form>
    </section>
  );
}
