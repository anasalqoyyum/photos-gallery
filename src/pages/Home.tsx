import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import Dropdown from "../layouts/Dropdown";
import Footer from "../layouts/Footer";
import { Albums, Users } from "../common/types";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState<Albums[]>([]);
  const [userData, setUserData] = useState<Users[]>([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(9);
  const [page, setPage] = useState(1);
  const PrimaryKey = ["id"];

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const data = albumData.map((t1) => ({
    ...userData.find((t2) => t2.id === t1.userId),
    ...t1,
  }));

  const handlePageNext = () => {
    setPage(page + 1);
    setOffset(offset + perPage);
  };

  const handlePagePrevious = () => {
    setPage(page - 1);
    setOffset(offset - perPage);
  };

  const results = !search
    ? data
    : data.filter((item) => {
        return Object.keys(item).some((key) =>
          PrimaryKey.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });

  useEffect(() => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/albums").then((res) => {
      setAlbumData(res.data);
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        setUserData(res.data);
      });
    });
    setLoading(false);
  }, []);

  return (
    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className="container mx-auto mt-20">
        <div className="text-gray-900 text-center text-2xl font-bold">
          Welcome to Photo Gallery
        </div>
        <div className="text-gray-900 text-center mb-8 text-base font-base">
          Your memories will always be save with us
        </div>
        <div className="my-2 flex justify-center items-center flex-wrap sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                onChange={handleSearch}
                className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Album</option>
                {albumData.map((x, i) => (
                  <option key={i} value={x.title}>
                    {x.title.substr(0, 6)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                onChange={handleSearch}
                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option value="">Username</option>
                {userData.map((x, i) => (
                  <option key={i} value={x.name}>
                    {x.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-gray-500"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <input
              placeholder="Search"
              onChange={handleSearch}
              value={search}
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center ">
          {results.length === 0 ? (
            <div className="cursor-default bg-yellow-500 mt-8 transition duration-500 hover:bg-yellow-700 text-white py-1 px-5 rounded-full text-center">
              Maaf Album Tidak Ditemukan
            </div>
          ) : (
            <>
              {loading && <div>Loading...</div>}
              {!loading &&
                results.slice(offset, offset + perPage).map((x) => (
                  <Link to={`/albums/${x.id}`} key={x.id}>
                    <div
                      className="bg-gray-100 m-auto w-96 h-64 my-1.5 mx-1.5 rounded transition duration-500 hover:bg-black hover:bg-opacity-25 hover:rounded"
                      style={{
                        backgroundImage: `url(https://via.placeholder.com/468?text=AlbumPlaceholder)`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="flex xl:opacity-0 md:opacity-100 flex-row items-end h-full w-full transition duration-300 hover:bg-black hover:bg-opacity-25 hover:opacity-100 hover:rounded">
                        <div className="flex flex-col w-full pb-3 pt-10 px-3 rounded bg-gradient-to-t from-black text-gray-200">
                          <Link to={`/albums/${x.id}`}>
                            <h3 className="text-base font-semibold leading-5 hover:underline">
                              {x.title}
                            </h3>
                          </Link>
                          <div className="inline-flex items-center">
                            <span className="font-base text-xs my-1 mr-1">
                              Uploaded by&nbsp;
                              <Link to={`/users/${x.userId}`}>
                                <span className="capitalize font-semibold hover:underline">
                                  {x.name}
                                </span>
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center my-12">
        <div className="flex text-gray-700">
          <div className="h-8 w-8 mr-1 flex justify-center items-center  cursor-pointer">
            <button onClick={handlePagePrevious} disabled={page === 1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-chevron-left w-4 h-4"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="flex h-8 font-medium ">
            <div className="w-8 h-8 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-blue-600">
              {page}
            </div>
          </div>
          <div className="h-8 w-8 ml-1 flex justify-center items-center  cursor-pointer">
            <button onClick={handlePageNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-chevron-right w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
