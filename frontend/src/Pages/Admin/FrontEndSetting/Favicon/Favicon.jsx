import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetFaviconsQuery,
  useAddFaviconMutation,
  useUpdateFaviconMutation,
} from "../../../../Redux/favicon/faviconApi.js";

export default function Favicon() {
  const [images, setImages] = useState([]);

  const { data } = useGetFaviconsQuery();
  const favicon = data?.data;
  const id = favicon?._id;

  const [addFavicon, { isLoading: addLoading, isSuccess: addSuccess, isError: addIsError, error: addError }] = useAddFaviconMutation();

  const [updateFavicon, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateIsError, error: updateError }] = useUpdateFaviconMutation();

  const handleAddOrUpdateFavicon = async (e) => {
    e.preventDefault();

    if (images.length <= 0) {
      return Swal.fire("", "Image is required", "warning");
    }

    const formData = new FormData();
    formData.append("icon", images[0]?.file);

    try {
      if (id) {
        await updateFavicon({ id, formData });
      } else {
        await addFavicon(formData);
      }
    } catch (error) {
      Swal.fire("", error?.data?.error || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    if (addIsError || updateIsError) {
      Swal.fire(
        "",
        (addIsError && addError?.data?.error) || (updateIsError && updateError?.data?.error) || "Something went wrong",
        "error"
      );
    } else if (addSuccess) {
      setImages([]);
      Swal.fire("", "Favicon added successfully", "success");
    } else if (updateSuccess) {
      setImages([]);
      Swal.fire("", "Favicon updated successfully", "success");
    }
  }, [addIsError, addError, addSuccess, updateIsError, updateError, updateSuccess]);

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>{id ? "Update Favicon" : "Add Favicon"}</h3>
      </div>

      <form onSubmit={handleAddOrUpdateFavicon} className="p-4">
        <div className="w-full md:w-1/2">
          <p className="mb-1">Icon</p>
          <div>
            <ImageUploading
              value={images}
              onChange={(icn) => setImages(icn)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div
                  className="items-center gap-10 rounded border border-dashed p-4 md:flex"
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

                  <div className={`${images?.length > 0 && "mt-4"} `}>
                    {images?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={img["data_url"]}
                          alt=""
                          className="h-20 w-32"
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

        <div className="mt-4">
          {favicon?.icon && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${favicon?.icon}`}
              alt="Favicon"
              className="w-32"
            />
          )}
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addLoading || updateLoading}
              className="admin_btn"
            >
              {addLoading || updateLoading
                ? "Loading..."
                : id
                ? "Update Favicon"
                : "Add Favicon"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
