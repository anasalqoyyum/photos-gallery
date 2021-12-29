import { useState } from "react";
import Navbar from "../layouts/Navbar";
import Dropdown from "../layouts/Dropdown";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className="container mx-auto mt-20">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md text-center">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl mt-8 md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.{" "}
            </p>
            <Link to="/">
              <button className="px-4 inline py-2 mt-6 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
                back to homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
