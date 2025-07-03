import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from "../../../../Redux/banner/bannerApi";

export default function EditBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState([]);

  const { data } = useGetSingleBannerQuery(id);
  const banner = data?.data;

  const [updateBanner, { isLoading }] = useUpdateBannerMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const subTitle = e.target.subTitle.value;
    const description = e.target.description.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);  
    if (image?.length > 0) formData.append("image", image[0].file);

    try {
      const res = await updateBanner({ id, formData });
      if (res?.data?.success) {
        Swal.fire("", "Banner edit successfully", "success");
        e.target.reset();
        setImage([]);
        navigate("/admin/front-end/banner/all");
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
        <h3>Edit Banner</h3>
      </div>

      <form className="p-4" onSubmit={handleEdit}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1">Title</p>
            <input
              type="text"
              name="title"
              required
              defaultValue={banner?.title}
            />
          </div>
          <div>
            <p className="mb-1">Sub Title</p>
            <input
              type="text"
              name="subTitle"
              required
              defaultValue={banner?.subTitle}
            />
          </div>

          <div>
            <p className="mb-1">Description</p>
            <textarea
              name="description"
              rows="4"
              className="w-full rounded border p-2"
              required
              defaultValue={banner?.description}
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

              {banner?.bg && (
                <div className="mt-4">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${banner?.bg}`}
                    alt={banner?.title}
                    className="w-24"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button className="admin_btn" disabled={isLoading}>
            {isLoading ? "Editing..." : "Edit Banner"}
          </button>
        </div>
        -
      </form>
    </section>
  );
}
