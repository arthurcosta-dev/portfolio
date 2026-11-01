import AboutBento from "../components/home/AboutBento";
import ContactSection from "../components/home/ContactSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Hero from "../components/home/Hero";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  usePageTitle();

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutBento />
      <ContactSection />
    </>
  );
};

export default Home;
