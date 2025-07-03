import { useEffect, useState } from "react";
import MultiSocial from "./MultiSocial";
import Spinner from "../../../Components/Spinner/Spinner";
import Swal from "sweetalert2";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import {
  useAddCounterMutation,
  useGetCounterQuery,
  useUpdateCounterMutation,
} from "../../../Redux/counter/counterApi";

export default function Counter() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [counts, setCounts] = useState([]);
  const { data, isLoading } = useGetCounterQuery();
  const counter = data?.data;
  const id = counter?._id;

  useEffect(() => {
    if (counter?.counts) {
      setCounts(counter?.counts);
      setTitle(counter?.title);
    }
  }, [counter]);

  const [addCounter, { isLoading: addLoading }] = useAddCounterMutation();
  const [updateCounter, { isLoading: uLoading }] = useUpdateCounterMutation();

  const handleCounter = async (e) => {
    e.preventDefault();

    const bgImage = images[0]?.file;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", bgImage);
    formData.append("counts", JSON.stringify(counts));

    if (id) {
      const res = await updateCounter({ id, formData });
      if (res?.data?.success) {
        Swal.fire("", "Contact updated successfully", "success");
        setTitle("");
        setImages([]);
        setCounts([]);
      } else {
        Swal.fire("", "Something went wrong!", "error");
        console.log(res);
      }
    } else {
      const res = await addCounter(formData);
      if (images?.length <= 0) {
        return Swal.fire("", "Background image is required", "warning");
      }

      if (res?.data?.success) {
        Swal.fire("", "Contact added successfully", "success");
        setTitle("");
        setImages([]);
        setCounts([]);
      } else {
        Swal.fire("", res?.data?.message || "Something went wrong!", "error");
        console.log(res);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="rounded bg-base-100 pb-4 shadow">
      <div className="border-b p-4 font-medium text-neutral">
        <h3>Counter Setting</h3>
      </div>

      <form
        onSubmit={handleCounter}
        className="form_group mx-4 mt-3 flex flex-col gap-3 text-sm"
      >
        <div>
          <div>
            <p className="mb-1">Title</p>
            <input
              type="text"
              required
              defaultValue={counter?.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <p className="mb-1">Background Image</p>
            <ImageUploading
              defaultValue={images}
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
                          alt="counter"
                          className="h-20 w-32"
                          loading="lazy"
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

            {counter?.bgImage && (
              <div className="mt-4">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    counter?.bgImage
                  }`}
                  alt="counter"
                  className="h-20 w-40"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>

        <MultiSocial counts={counts} setCounts={setCounts} />

        <div className="flex justify-end">
          <button disabled={addLoading || uLoading} className="admin_btn">
            {addLoading || uLoading ? "Loading..." : id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
