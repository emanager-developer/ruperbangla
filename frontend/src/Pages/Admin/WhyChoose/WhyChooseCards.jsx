import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteWhychooseByIdMutation,
  useGetWhychooseQuery,
} from "../../../Redux/whychoose/whychooseApi";
import Spinner from "../../../Components/Spinner/Spinner";

export default function WhyChooseCards() {
  const { data, isLoading, isError, isSuccess } = useGetWhychooseQuery();
  const whychoose = data?.data;

  const [deleteWhychoose] = useDeleteWhychooseByIdMutation();
  const deleteWhychooseHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Whychoose?");
    if (isConfirm) {
      try {
        const res = await deleteWhychoose(id).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "",
            text: "Whychoose Deleted Successfully",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "",
          text: "Something went wrong",
          icon: "error",
        });
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
        {whychoose?.map((whychoose, i) => (
          <tr key={whychoose?._id}>
            <td>{i + 1}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/whychoose/${
                  whychoose?.image
                }`}
                alt={whychoose?.image}
                className="h-8 w-14 rounded"
              />
            </td>
            <td>
              <div className="flex items-center gap-3">
                <button onClick={() => deleteWhychooseHandler(whychoose?._id)}>
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
          <h1 className="font-medium text-neutral">Why Choose Cards</h1>
          <Link to="/admin/whyChoose/cards/add" className="admin_btn text-sm">
            Add Why Choose Card
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
