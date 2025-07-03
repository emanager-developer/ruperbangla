import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useGetGalleryQuery } from "../../../Redux/gallery/galleryApi";

export default function Gallery() {
  const { data } = useGetGalleryQuery();
  const gallery = data?.data;

  return (
    <section className="bg-slate-100 py-14">
      <div className="container">
        <PhotoProvider>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="7px">
              {gallery?.map((gallery) => (
                <PhotoView
                  key={gallery?._id}
                  src={`${import.meta.env.VITE_BACKEND_URL}/gallery/${gallery?.image}`}
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/gallery/${gallery?.image}`}
                    alt=""
                    className="block"
                  />
                </PhotoView>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </PhotoProvider>
      </div>
    </section>
  );
}
