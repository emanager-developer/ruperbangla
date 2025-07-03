import "../../../assets/css/hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { useGetAllBannerQuery } from "../../../Redux/banner/bannerApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  const { data } = useGetAllBannerQuery();
  const banners = data?.data;

  return (
    <div className="relative h-[30vh] w-full md:h-[90vh]">
      <img
        src="https://scontent.fdac24-1.fna.fbcdn.net/v/t39.30808-6/508089568_122125693274830112_619643876674217934_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFIpF8IwadjvAMr0fcHT_FjEPisllAn6u8Q-KyWUCfq7749OSOyhQwvu8MWhgtkbmGst-bJEAS5yZqqTsquDr6R&_nc_ohc=nCvhk9JTpb8Q7kNvwEsp82P&_nc_oc=Adlo1kuSlOtmzU_QIMHhW9ABHuwM1lo-eRLIjBcgmHPe0pG-GmeXknz9TtM5L7yjkeM&_nc_zt=23&_nc_ht=scontent.fdac24-1.fna&_nc_gid=ueGVNRluvfjYAK_yTRSrPg&oh=00_AfP8uZgmOQcZaJvw64F8Fm9LZ2Aa26MTuug-EkWtO5kDNQ&oe=686BE60E"
        alt="Banner Background"
        className="h-full w-full object-cover"
      />

      <div className="absolute bottom-0 left-0 z-10 hidden w-full items-center overflow-hidden bg-gradient-to-r from-[#0d1e53]/80 via-[#0d1e53]/50 to-[#0d1e53]/20 py-10 pl-8 sm:pl-20 md:flex">
        {/* Text Content Animation */}
        <motion.div
          className="max-w-2xl space-y-4 text-white"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-xs sm:text-base">Discover Your Dream Property</p>
          <h1 className="text-sm font-bold leading-tight sm:text-2xl">
            Build Your Future with Us Today
          </h1>
          <p className="text-xs sm:text-lg">
            Explore our diverse range of properties and services tailored to
            meet your needs.
          </p>
        </motion.div>

        {/* Button Animation */}
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
