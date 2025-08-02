import { useGetVideoGalleryQuery } from "../../Redux/gallery/videoGalleryApi";

export default function VideoGallery() {
  const { data } = useGetVideoGalleryQuery();
  const videos = data?.data || [];

  if (videos?.length === 0) return;

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="mb-6 text-center text-4xl font-semibold text-neutral">
          Video Gallery
        </h2>

        <div
          className={`gap-4 ${videos?.length == 1 ? "flex justify-center" : "grid md:grid-cols-2"}`}
        >
          {videos?.map((video) => (
            <div
              key={video._id}
              className={`aspect-video overflow-hidden rounded-lg shadow ${videos?.length == 1 && "w-full sm:w-1/2"}`}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video?.videoId}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube Video"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ borderRadius: "10px" }}
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
