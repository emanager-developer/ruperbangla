import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetVideoGalleryByIdQuery,
  useUpdateVideoGalleryMutation,
} from "../../../../Redux/gallery/videoGalleryApi";

export default function EditVideoGallery() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetVideoGalleryByIdQuery(id);
  const video = data?.data;

  const [updateVideoGallery, { isLoading }] = useUpdateVideoGalleryMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const videoId = e.target.videoId.value;
    const data = { videoId };
    const res = await updateVideoGallery({ id, data });

    if (res?.data?.success) {
      toast.success("Video updated successfully");
      navigate("/admin/gallery/video/all");
    } else {
      toast.error(res?.error?.data?.error || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form_group rounded bg-base-100 p-4 shadow sm:w-1/2"
    >
      <div className="mt-2">
        <p className="text-neutral-content">Youtube Video ID</p>
        <input type="text" name="videoId" defaultValue={video?.videoId} />
      </div>

      <div className="mt-4">
        <button
          className="rounded bg-primary px-4 py-2 text-sm text-base-100"
          disabled={isLoading}
        >
          {isLoading ? "Loading.." : "Edit Video"}
        </button>
      </div>
    </form>
  );
}
