import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "../../../../Redux/service/serviceApi";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");

  const { data } = useGetSingleServiceQuery(id);
  const service = data?.data;

  useEffect(() => {
    if (service) {
      setDescription(service?.description);
    }
  }, [service]);

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    if (description === "") {
      return Swal.fire("", "Project description is required", "warning");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image?.length > 0) formData.append("image", image[0].file);

    try {
      const res = await updateService({ id, formData });
      if (res?.data?.success) {
        Swal.fire("", "Service edit successfully", "success");
        e.target.reset();
        setImage([]);
        setDescription("");
        navigate("/admin/service/all");
      } else {
        Swal.fire("", res?.data?.message || "Something went wrong!", "error");
        console.log(res);
      }
    } catch (error) {
      Swal.fire("", "Something went wrong!", "error");
      console.log(error);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Edit Service</h3>
      </div>

      <form className="p-4" onSubmit={handleEdit}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={service?.title}
              />
            </div>

            <div>
              <p className="mb-1">Image</p>
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

                {service?.image && (
                  <div className="mt-4">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${service?.image}`}
                      alt={service?.title}
                      className="w-24"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded border md:col-span-2">
            <p className="border-b p-3">Description</p>
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
            {isLoading ? "Editing..." : "Edit Service"}
          </button>
        </div>
        -
      </form>
    </section>
  );
}
