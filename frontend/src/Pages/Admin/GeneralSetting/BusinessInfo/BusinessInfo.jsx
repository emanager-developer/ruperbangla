import { useEffect, useState } from "react";
import swal from "sweetalert2";
import {
  useGetBusinessInfoQuery,
  useAddBusinessInfoMutation,
  useUpdateBusinessInfoMutation,
} from "../../../../Redux/businessInfo/businessInfoApi.js";

export default function BusinessInfo() {
  const { data,  isLoading: isFetching } = useGetBusinessInfoQuery();
  const business = data?.data;
  const id = business?._id;

  const [name, setName] = useState("");
  const [startYear, setStartYear] = useState("");
  const [type, setType] = useState("");

  const [addBusinessInfo, { isLoading: addIsLoading }] = useAddBusinessInfoMutation();

  const [updateBusinessInfo, { isLoading: updateIsLoading }] = useUpdateBusinessInfoMutation();

  useEffect(() => {
    if (business) {
      setName(business?.name || "");
      setStartYear(business?.startYear || "");
      setType(business?.type || "");
    }
  }, [business]);

  const handleAddUpdate = async (e) => {
    e.preventDefault();

    const info = { name, startYear, type };

    try {
      if (id) {
        const res = await updateBusinessInfo({ id, info });
        if (res?.data?.success) {
          swal.fire("", "Business Info updated successfully", "success");
        }
      } else {
        const res = await addBusinessInfo(info);
        if (res?.data?.success) {
          swal.fire("", "Business Info added successfully", "success");
        }
      }
    } catch (error) {
      swal.fire("", "Something went wrong", "error");
    }
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Business Info</h3>
      </div>

      <form className="p-4" onSubmit={handleAddUpdate}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="mb-1">Business Name</p>
            <input
              type="text"
              name="businessName"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-1">Business Start Year</p>
            <input
              type="number"
              name="businessStartYear"
              required
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-1">Business Type</p>
            <input
              type="text"
              name="businessType"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addIsLoading || updateIsLoading}
              className="admin_btn"
            >
              {addIsLoading || updateIsLoading
                ? "Loading..."
                : id
                ? "Update"
                : "Add"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
