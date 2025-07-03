import "../../../assets/css/hero.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { useGetAllBannerQuery } from "../../../Redux/banner/bannerApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  const { data } = useGetAllBannerQuery();
  const banners = data?.data[0];

  console.log("Banners:", banners);

  return (
    <div className="relative h-[30vh] w-full md:h-[90vh]">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/${banners?.bg}`}
        alt="Banner Background"
        className="h-full w-full object-cover"
      />

      <div className="absolute bottom-0 left-0 z-10 hidden w-full items-center overflow-hidden bg-gradient-to-r from-[#0d1e53]/80 via-[#0d1e53]/50 to-[#0d1e53]/20 py-10 pl-8 sm:pl-20 md:flex">
        <motion.div
          className="max-w-2xl space-y-4 text-white"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-xs sm:text-base">{banners?.subTitle}</p>
          <h1 className="text-sm font-bold leading-tight sm:text-2xl">
            {banners?.title}
          </h1>
          <p className="text-xs sm:text-lg">
            {banners?.description}
          </p>
        </motion.div>

        <motion.div
          className="ml-auto pr-8 sm:pr-20"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <Link
            to="/contact-us"
            className="rounded-full bg-[#0d1e53] px-6 py-3 font-semibold text-white transition duration-300 hover:bg-[#142a6a]"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
