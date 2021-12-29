import { Link } from "react-router-dom";

const Navbar = ({ toggle }) => {
  return (
    <>
      <nav className="flex justify-between items-center h-16 bg-white-500 text-gray-500 relative pt-10 pb-10 shadow-lg ">
        <Link to="/" className="2xl:pl-72 xl:pl-64 lg:pl-28 md:pl-20 pl-10">
          {/* <img src={Logo} alt="" /> */}
          <div className="text-2xl tracking-wider">Photo Gallery</div>
        </Link>
        <div className="px-10 cursor-pointer md:hidden" onClick={toggle}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <div className="pr-10 hidden md:block 2xl:pr-72 xl:pr-64 lg:pr-28">
          <Link
            className=" text-base lg:text-normal font-medium 
          2xl:mr-10 xl:mr-5 lg:mr-3"
            to="/"
          >
            <button className="ml-4 px-3 py-2 rounded-md text-md font-medium text-gray-500 hover:text-white hover:bg-blue-600 focus:outline-none focus:text-white focus:bg-blue-600">
              Home
            </button>
          </Link>
          <Link
            className=" text-base lg:text-normal 2xl:mr-10 xl:mr-5 lg:mr-3"
            to="/favorites"
          >
            <button className="ml-4 px-3 py-2 rounded-md text-md font-medium text-gray-500 hover:text-white hover:bg-blue-600 focus:outline-none focus:text-white focus:bg-blue-600">
              Favorites
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
