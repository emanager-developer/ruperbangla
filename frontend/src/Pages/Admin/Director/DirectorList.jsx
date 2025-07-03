import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteDirectorMutation,
  useGetDirectorQuery,
} from "../../../Redux/director/directorApi";
import Spinner from "../../../Components/Spinner/Spinner";

export default function DirectorList() {
  const { data, isLoading, isError, isSuccess } = useGetDirectorQuery();
  const directors = data?.data;

  const [deleteDirector] = useDeleteDirectorMutation();
  const deleteDirectorHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Director?");
    if (isConfirm) {
      try {
        const res = await deleteDirector(id).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "",
            text: "Director Deleted Successfully",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "",
          text: "Something went wrong",
          icon: "error",
        });
        console.log(error);
      }
    }
  };

  let content = null;
  if (isLoading) return (content = <Spinner />);

  if (isError) {
    content = <p className="mt-5 text-red-500">No Data!</p>;
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {directors?.map((director, i) => (
          <tr key={director?._id}>
            <td>{i + 1}</td>
            <td>{director?.name}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${director?.image}`}
                alt={Image}
                className="h-8 w-14 rounded"
              />
            </td>
            <td>
              <div className="flex items-center gap-3">
                <Link to={`/admin/director/edit/${director?._id}`}>
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => deleteDirectorHandler(director?._id)}>
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
          <h1 className="font-medium text-neutral">Directors</h1>
          <Link to="/admin/director/add" className="admin_btn text-sm">
            Add Director
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
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
