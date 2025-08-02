import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddVideoGalleryMutation } from "../../../../Redux/gallery/videoGalleryApi";

export default function AddVideoGallery() {
  const navigate = useNavigate();

  const [addVideoGallery, { isLoading }] = useAddVideoGalleryMutation();
  const handleAdd = async (e) => {
    e.preventDefault();

    const videoId = e.target.videoId.value;
    const data = { videoId };
    const res = await addVideoGallery(data);

    if (res?.data?.success) {
      toast.success("Video added successfully");
      navigate("/admin/gallery/video/all");
    } else {
      toast.error(res?.error?.data?.error || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleAdd}
      className="form_group rounded bg-base-100 p-4 shadow sm:w-1/2"
    >
      <div className="mt-2">
        <p className="text-neutral-content">Youtube Video ID</p>
        <input type="text" name="videoId" />
      </div>

      <div className="mt-4">
        <button
          className="rounded bg-primary px-4 py-2 text-sm text-base-100"
          disabled={isLoading}
        >
          {isLoading ? "Loading.." : "Add Video"}
        </button>
      </div>
    </form>
  );
}
