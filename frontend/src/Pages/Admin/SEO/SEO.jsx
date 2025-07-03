import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BsX } from "react-icons/bs";
import {
  useGetSEOQuery,
  useAddSEOMutation,
  useUpdateSEOMutation,
} from "../../../Redux/seo/seoApi.js";

export default function SEO() {
  const { data, isLoading: isFetching } = useGetSEOQuery();
  const seo = data?.data;
  const id = seo?._id;

  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  const [addSEO, { isLoading: addIsLoading }] = useAddSEOMutation();
  const [updateSEO, { isLoading: updateIsLoading }] = useUpdateSEOMutation();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [metaContent, setMetaContent] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (seo) {
      setTitle(seo?.title || "");
      setKeywords(seo?.keywords || []);
      setAuthor(seo?.author || "");
      setMetaContent(seo?.metaContent || "");
      setDescription(seo?.description || "");
    }
  }, [seo]);

  const handleRemoveKeyword = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  const handleSEOSetting = async (e) => {
    e.preventDefault();

    const data = {
      title,
      keywords,
      author,
      metaContent,
      description,
    };

    try {
      if (id) {
        const res = await updateSEO({ id, seoData: data });
        if (res?.data?.success) {
          Swal.fire("", "SEO Setting Updated Successfully", "success");
        } else {
          Swal.fire("", "Something went wrong, please try again later", "error");
        }
      } else {
        const res = await addSEO(data);
        if (res?.data?.success) {
          Swal.fire("", "SEO Setting Added Successfully", "success");
        } else {
          Swal.fire("", "Something went wrong, please try again later", "error");
        }
      }
    } catch (error) {
      Swal.fire("", "Something went wrong, please try again later", "error");
    }
  };

  if (isFetching) return <p>Loading SEO Settings...</p>;

  return (
    <section className="mx-auto rounded bg-base-100 shadow md:w-3/4">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">SEO Setting</h3>
      </div>

      <form onSubmit={handleSEOSetting} className="form_group p-4 text-neutral-content">
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <p className="mb-1">Title *</p>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <p className="mb-1">Keywords</p>
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Press Enter and add Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div
                onClick={() => {
                  if (keyword.trim()) {
                    setKeywords([...keywords, keyword]);
                    setKeyword("");
                  }
                }}
                className="mt-px flex h-[34px] w-10 cursor-pointer items-center justify-center rounded bg-primary text-base-100"
              >
                +
              </div>
            </div>
            <div className="mt-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="relative mb-2 mr-2 whitespace-nowrap rounded bg-gray-100 px-3 py-1"
                >
                  {keyword}
                  <span
                    onClick={() => handleRemoveKeyword(index)}
                    className="absolute -right-1 -top-1 cursor-pointer text-lg text-red-500"
                  >
                    <BsX />
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1">Author *</p>
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div>
            <p className="mb-1">Meta Content</p>
            <input
              type="text"
              name="metaContent"
              value={metaContent}
              onChange={(e) => setMetaContent(e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <p className="mb-1">Description *</p>
            <textarea
              name="description"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
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
                ? "Update SEO Setting"
                : "Add SEO Setting"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
