import About from "../../../Components/Home/About/About";
import Features from "../../../Components/Home/Features/Features";
import Gallery from "../../../Components/Home/Gallery/Gallery";
import Hero from "../../../Components/Home/Hero/Hero";
import ProjectHighlight from "../../../Components/Home/ProjectHighlight/ProjectHighlight";
// import WhyChoose from "../../../Components/Home/WhyChoose/WhyChoose";
import { useEffect } from "react";
import Counter from "../../../Components/Home/Counter";
import Services from "../../../Components/Home/Services";
import ContactUs from "../../../Components/Home/ContactUs";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <About />
      {/* <WhyChoose /> */}
      <Services />
      <ProjectHighlight />
      <Gallery />
      <Features />
      <Counter />
      <ContactUs />
    </>
  );
}
