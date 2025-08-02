import { BiSolidPencil } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useDeleteVideoGalleryMutation,
  useGetVideoGalleryQuery,
} from "../../../../Redux/gallery/videoGalleryApi";
import { toast } from "react-hot-toast";

export default function AllVideoGallery() {
  const { data, isLoading, isError, error } = useGetVideoGalleryQuery();

  const [deleteVideoGallery] = useDeleteVideoGalleryMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Video?");
    if (isConfirm) {
      const res = await deleteVideoGallery(id);
      if (res?.data?.success) {
        toast.success("Video deleted successfully");
      } else {
        toast.error(res?.error?.data?.error || "Something went wrong");
        console.log(res);
      }
    }
  };

  let content = null;

  if (!isLoading && isError) content = <p>{error?.data?.error}</p>;

  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((video, i) => (
      <tr key={video?._id}>
        <td>{i + 1}</td>
        <td>{video?.videoId}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/gallery/video/edit/${video?._id}`}
              className="duration-200 hover:text-green-700"
            >
              <BiSolidPencil />
            </Link>
            <button
              onClick={() => handleDelete(video?._id)}
              className="text-lg duration-200 hover:text-red-600"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between rounded bg-base-100 p-3">
        <h3 className="font-medium text-neutral">All Video Gallery</h3>
        <Link
          to="/admin/gallery/video/add"
          className="admin_btn text-sm shadow"
        >
          Add Video
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Video Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {content ? (
              content
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-sm text-red-500">
                  No category found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
