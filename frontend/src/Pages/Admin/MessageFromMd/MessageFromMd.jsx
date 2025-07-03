import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useAddMFMdMutation,
  useGetMFMdQuery,
  useUpdateMFMdMutation,
} from "../../../Redux/director/mfMd";

export default function MessageFromMd() {
  const editor = useRef(null);

  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data } = useGetMFMdQuery();
  const mfMd = data?.data;

  const [addMFMd, { isLoading: isAddLoading }] = useAddMFMdMutation();
  const [updateMFMd, { isLoading: isULoading }] = useUpdateMFMdMutation();

  useEffect(() => {
    if (mfMd) {
      setTitle(mfMd.name);
      setDescription(mfMd.message);
      setImage([
        { data_url: `${import.meta.env.VITE_BACKEND_URL}${mfMd.image}` },
      ]);
    }
  }, [mfMd]);

  const handleAddEdit = async (e) => {
    e.preventDefault();

    const img = image[0]?.file;

    const formData = new FormData();
    formData.append("name", title);
    formData.append("message", description);
    if (img) formData.append("image", img);

    if (mfMd?._id) {
      const res = await updateMFMd({
        id: mfMd?._id,
        formData,
      });

      if (res?.data?.success) {
        Swal.fire("", "Message From Md updated successfully", "success");
        setTitle("");
        setDescription("");
        setImage([]);
      } else {
        Swal.fire("", "Operation failed", "error");
        console.log(res);
      }
    } else {
      const res = await addMFMd(formData);

      if (res?.data?.success) {
        Swal.fire("", "Message From Md updated successfully", "success");
        setTitle("");
        setDescription("");
        setImage([]);
      } else {
        Swal.fire("", "Operation failed", "error");
        console.log(res);
      }
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Message From Md</h3>
      </div>

      <form onSubmit={handleAddEdit} className="p-4">
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Name</p>
              <input
                type="text"
                name="title"
                className="border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

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

          <div className="rounded border md:col-span-2">
            <p className="border-b p-3">Message</p>
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
          <button
            type="submit"
            className="admin_btn"
            disabled={isAddLoading || isULoading}
          >
            {isAddLoading || isULoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
