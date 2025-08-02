import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useDeleteGalleryByIdMutation,
  useGetGalleryQuery,
} from "../../../../Redux/gallery/galleryApi";
import Spinner from "../../../../Components/Spinner/Spinner";
import toast from "react-hot-toast";

export default function Gallery() {
  const { data, isLoading, isError, isSuccess } = useGetGalleryQuery();
  const gallery = data?.data;

  const [deleteGallery] = useDeleteGalleryByIdMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this product?");
    if (isConfirm) {
      try {
        const res = await deleteGallery(id).unwrap();
        if (res?.success) {
          toast.success("Gallery deleted successfully");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

  let content = null;
  if (isLoading) return (content = <Spinner />);

  if (isError) {
    content = (
      <p className="mt-5 text-red-500">Something went wrong to get data!</p>
    );
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {gallery?.map((gallery, i) => (
          <tr key={gallery?._id}>
            <td>{i + 1}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/gallery/${
                  gallery?.image
                }`}
                alt={gallery?.image}
                className="h-8 w-14 rounded"
              />
            </td>
            <td>
              <div className="flex items-center gap-3">
                <button onClick={() => handleDelete(gallery?._id)}>
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">Gallery</h1>
          <Link to="/admin/front-end/gallery/add" className="admin_btn text-sm">
            Add Gallery
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}
