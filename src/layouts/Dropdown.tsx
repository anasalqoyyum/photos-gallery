import { Link } from "react-router-dom";

const Dropdown = ({ isOpen, toggle }) => {
  return (
    <>
      <div
        className={
          isOpen
            ? "grid grid-rows text-center items-center bg-transparent text-gray-500 pt-2"
            : "hidden"
        }
        onClick={toggle}
      >
        <Link
          className="p-4 rounded-md text-md font-medium text-gray-500 hover:text-white hover:bg-blue-600 focus:outline-none focus:text-white focus:bg-blue-600"
          to="/"
        >
          Home
        </Link>
        <Link
          className="p-4 rounded-md text-md font-medium text-gray-500 hover:text-white hover:bg-blue-600 focus:outline-none focus:text-white focus:bg-blue-600"
          to="/favorites"
        >
          Favorites
        </Link>
      </div>
    </>
  );
};

export default Dropdown;
