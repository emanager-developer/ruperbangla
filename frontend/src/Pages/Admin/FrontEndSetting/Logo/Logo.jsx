import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetLogosQuery,
  useAddLogoMutation,
  useUpdateLogoMutation,
} from "../../../../Redux/logo/logoApi.js";

export default function Logo() {
  const [images, setImages] = useState([]);

  const { data } = useGetLogosQuery();
  const logo = data?.data;
  const id = logo?._id;

  const [
    addLogo,
    {
      isLoading: addLoading,
      isSuccess: addSuccess,
      isError: addIsError,
      error: addError,
    },
  ] = useAddLogoMutation();
  const [
    updateLogo,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateLogoMutation();

  const handleAddOrUpdateLogo = async (e) => {
    e.preventDefault();

    if (images?.length <= 0) {
      return Swal.fire("", "Image is required", "warning");
    }

    const formData = new FormData();
    formData.append("logo", images[0]?.file);

    try {
      if (id) {
        await updateLogo({ id, formData });
      } else {
        await addLogo(formData);
      }
    } catch (error) {
      Swal.fire("", error?.data?.error || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    if (addIsError || updateIsError) {
      Swal.fire(
        "",
        (addIsError && addError?.data?.error) ||
          (updateIsError && updateError?.data?.error) ||
          "Something went wrong",
        "error",
      );
    } else if (addSuccess) {
      setImages([]);
      Swal.fire("", "Logo added successfully", "success");
    } else if (updateSuccess) {
      setImages([]);
      Swal.fire("", "Logo updated successfully", "success");
    }
  }, [
    addIsError,
    addError,
    addSuccess,
    updateIsError,
    updateError,
    updateSuccess,
  ]);

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>{id ? "Update Logo" : "Add Logo"}</h3>
      </div>

      <form onSubmit={handleAddOrUpdateLogo} className="p-4">
        <div className="w-full md:w-1/2">
          <p className="mb-1">Logo</p>
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
          {logo?.logo && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${logo?.logo}`}
              alt="Logo"
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
                  ? "Update Logo"
                  : "Add Logo"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
