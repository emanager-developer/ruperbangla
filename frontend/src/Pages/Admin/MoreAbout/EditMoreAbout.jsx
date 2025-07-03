import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import {
  useGetSingleMoreAboutQuery,
  useUpdateMoreAboutMutation,
} from "../../../Redux/about/moreAboutApi";
import Swal from "sweetalert2";

export default function EditMoreAbout() {
  const editor = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const { data } = useGetSingleMoreAboutQuery(id);
  const about = data?.data;

  useEffect(() => {
    if (about) {
      setDescription(about?.description);
    }
  }, [about]);

  const [updateAbout, { isLoading }] = useUpdateMoreAboutMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    if (!title || !description) {
      return toast.error("Please fill all the fields");
    }

    const data = {
      title,
      description,
    };

    const res = await updateAbout({ id, data });
    if (res?.data?.success) {
      Swal.fire("", "Updated successfully", "success");
      navigate("/admin/about/more/all");
    } else {
      Swal.fire("", "Something went wrong", "error");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 p-3">
      <form onSubmit={handleEdit} className="flex flex-col gap-4">
        <div>
          <p className="mb-1">Title</p>
          <input type="text" name="title" defaultValue={about?.title} />
        </div>

        <div>
          <p className="mb-1">Description</p>
          <JoditEditor
            ref={editor}
            value={description}
            onBlur={(text) => setDescription(text)}
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="admin_btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
