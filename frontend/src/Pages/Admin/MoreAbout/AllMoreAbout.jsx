import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteMoreAboutMutation,
  useGetMoreAboutQuery,
} from "../../../Redux/about/moreAboutApi";
import Swal from "sweetalert2";

export default function AllMoreAboutUs() {
  const { data } = useGetMoreAboutQuery();
  const moreAbout = data?.data;

  const [deleteAbout] = useDeleteMoreAboutMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;

    const res = await deleteAbout(id);
    if (res.data?.success) {
      Swal.fire("", "Deleted successfully", "success");
    } else {
      Swal.fire("", "Something went wrong", "error");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100">
      <div className="flex items-center justify-between border-b p-3">
        <h3 className="font-medium">More About</h3>
        <Link to="/admin/about/more/add" className="admin_btn text-sm">
          Add New
        </Link>
      </div>

      <div className="p-3">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {moreAbout?.map((about, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{about?.title}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/about/more/edit/${about?._id}`}
                        className="text-blue-500"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(about?._id)}
                        className="text-red-500"
                      >
                        <MdDelete className="text-[17px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
