import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useGetWhychooseSectionQuery,
  useAddWhychooseSectionMutation,
  useUpdateWhychooseSectionMutation,
} from "../../../Redux/whychooseSection/whychooseSectionApi";

export default function WhyChooseSection() {
  const { data, isLoading: isFetching } = useGetWhychooseSectionQuery();
  const section = data?.data;

  const [addWhychooseSection, { isLoading: isAdding }] =
    useAddWhychooseSectionMutation();
  const [updateWhychooseSection, { isLoading: isUpdating }] =
    useUpdateWhychooseSectionMutation();

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (section) {
      setTitle(section.title);
    }
  }, [section]);

  const handleWhychooseSection = async (e) => {
    e.preventDefault();

    const info = { title };
    let id = section?._id;

    try {
      let res;
      if (id) {
        res = await updateWhychooseSection({ id, info }).unwrap();
      } else {
        res = await addWhychooseSection(info).unwrap();
      }

      if (res?.success) {
        Swal.fire(
          "",
          id
            ? "Section updated successfully!"
            : "Section created successfully!",
          "success",
        );
      }
    } catch (error) {
      Swal.fire("", error?.message || "Something went wrong!", "error");
    }
  };

  if (isFetching) return <p>Loading...</p>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Why Choose Section</h3>
      </div>

      <form className="p-4" onSubmit={handleWhychooseSection}>
        <div className="text-neutral-content">
          <div>
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="admin_btn"
            type="submit"
            disabled={isAdding || isUpdating}
          >
            {isAdding || isUpdating ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
