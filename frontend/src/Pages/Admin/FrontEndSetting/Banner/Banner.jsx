import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import {
  useGetBannerQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
} from "../../../../Redux/banner/bannerApi.js";

export default function Banner() {
  const [video, setVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [bannerId, setBannerId] = useState(null);

  const { data: bannerData, isLoading: isBannerLoading } = useGetBannerQuery();
  const [addBanner, { isLoading: isAddLoading }] = useAddBannerMutation();
  const [updateBanner, { isLoading: isUpdateLoading }] =
    useUpdateBannerMutation();

  useEffect(() => {
    if (bannerData?.data) {
      setBannerId(bannerData.data._id);
    }
  }, [bannerData]);

  const handleAddEdit = async (e) => {
    e.preventDefault();

    const vid = video;

    const formData = new FormData();

    if (vid) formData.append("video", vid);

    try {
      let result;
      if (bannerId) {
        result = await updateBanner({ id: bannerId, formData }).unwrap();
      } else {
        result = await addBanner(formData).unwrap();
      }

      if (result.success) {
        setVideo(null);
        setUploadProgress(0);
        Swal.fire("", "Banner updated successfully", "success");
      }
    } catch (error) {
      Swal.fire("", error?.data?.message || "Operation failed", "error");
    }
  };

  if (isBannerLoading) return <p>Loading...</p>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Banner Video</h3>
      </div>

      <form onSubmit={handleAddEdit} className="p-4">
        <div>
          <div>
            <p className="mb-1">Background Video</p>
            <div className="rounded border border-dashed p-4">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                >
                  Choose Video
                </label>
                <p className="text-neutral-content">or Drop here</p>
              </div>

              {video && (
                <div className="mt-4">
                  <p>Selected Video: {video.name}</p>
                  <button
                    type="button"
                    onClick={() => setVideo(null)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          {uploadProgress > 0 && (
            <div className="mt-4">
              <p>Upload Progress: {uploadProgress}%</p>
              <div className="relative h-2 w-full bg-gray-200">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="absolute h-2 bg-primary"
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="admin_btn"
            disabled={isAddLoading || isUpdateLoading}
          >
            {isAddLoading || isUpdateLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </section>
  );
}
