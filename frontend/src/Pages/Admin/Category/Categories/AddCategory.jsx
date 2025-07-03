import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddCategoryMutation } from "../../../../Redux/category/categoryApi";

export default function AddCategory() {
  const navigate = useNavigate();

  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const order = e.target.order.value;

    if (name == "") {
      return Swal.fire("", "category name is required", "error");
    }

    if (order == "") {
      return Swal.fire("", "order number is required", "error");
    }

    const data = {
      name,
      order,
    };

    const res = await addCategory(data);

    if (res?.data?.success) {
      Swal.fire("", "Category added successfully", "success");
      navigate("/admin/category/categories");
    } else {
      Swal.fire(
        "",
        `${res?.error?.data?.message || "something went wrong!"}`,
        "error",
      );
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="form_group rounded bg-base-100 p-4 shadow sm:w-1/2"
    >
      <div className="mt-2">
        <p className="text-neutral-content">Category name</p>
        <input type="text" name="name" />
      </div>

      <div className="mt-2">
        <p className="text-neutral-content">Order Number</p>
        <input type="number" name="order" />
      </div>

      <div className="mt-4">
        <button
          className="rounded bg-primary px-4 py-2 text-sm text-base-100"
          disabled={isLoading}
        >
          {isLoading ? "Loading.." : "Add Category"}
        </button>
      </div>
    </form>
  );
}
