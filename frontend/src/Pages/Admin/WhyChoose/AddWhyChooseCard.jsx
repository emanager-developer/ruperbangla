import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useCreateWhychooseMutation } from "../../../Redux/whychoose/whychooseApi";

export default function AddWhyChooseCard() {
  const [createWhychoose, { isLoading }] = useCreateWhychooseMutation();
  const navigate = useNavigate();
  const [image, setImage] = useState([]);

  const handleAddWhychoose = async (e) => {
    e.preventDefault();

    if (image?.length <= 0) {
      return Swal.fire("", "Image is required", "warning");
    }

    const formData = new FormData();
    formData.append("image", image[0].file);

    try {
      const res = await createWhychoose(formData).unwrap();

      if (res?.success) {
        Swal.fire("", "Why Choose card added successfully!", "success");
        e.target.reset();
        setImage([]);
        navigate("/admin/whyChoose/cards/all");
      }
    } catch (error) {
      Swal.fire("", error.message || "Something went wrong!", "error");
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Add Why Choose Card</h3>
      </div>
      <form className="p-4" onSubmit={handleAddWhychoose}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Image</p>
              <div>
                <ImageUploading
                  value={image}
                  onChange={(icn) => setImage(icn)}
                  dataURLKey="data_url"
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

                      <div className={`${image?.length > 0 && "mt-4"} `}>
                        {image?.map((img, index) => (
                          <div key={index} className="image-item relative">
                            <img
                              src={img["data_url"]}
                              alt="Selected"
                              className="w-24"
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
        <div className="mt-6">
          <button type="submit" className="admin_btn" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Project"}
          </button>
        </div>
      </form>
    </section>
  );
}
