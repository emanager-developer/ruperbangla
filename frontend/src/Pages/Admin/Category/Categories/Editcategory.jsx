import Swal from "sweetalert2";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../Redux/category/categoryApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Editcategory() {
  const { id } = useParams();
  const { data } = useGetCategoryQuery(id);
  const category = data?.data;
  const navigate = useNavigate();

  const [updateCategory, { isLoading: updateLoading, isSuccess, isError }] =
    useUpdateCategoryMutation();

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const order = e.target.order.value;

    const formData = {
      name,
      order,
    };

    await updateCategory({ id, formData });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "update success", "success");
      navigate("/admin/category/categories");
    }
    if (isError) {
      Swal.fire("", "update fail, please try again", "error");
    }
  }, [isSuccess, isError, navigate]);

  return (
    <form
      onSubmit={handleUpdateCategory}
      className="form_group rounded bg-base-100 p-4 shadow sm:w-1/2"
    >
      <div className="mt-2">
        <p>Category name</p>
        <input type="text" name="name" defaultValue={category?.name} />
      </div>
      <div className="mt-2">
        <p>Order</p>
        <input type="number" name="order" defaultValue={category?.order} />
      </div>

      <div className="mt-4">
        <button
          className="rounded bg-primary px-6 py-1.5 text-base-100"
          disabled={updateLoading && "disabled"}
        >
          {updateLoading ? "Loading.." : "Update"}
        </button>
      </div>
    </form>
  );
}
