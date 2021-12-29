import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Photos, idParams, Albums } from "../common/types";
import Navbar from "../layouts/Navbar";
import Dropdown from "../layouts/Dropdown";
import Footer from "../layouts/Footer";

const Album = () => {
  const { id } = useParams<idParams>();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [loading, setLoading] = useState(false);
  const [photosData, setPhotosData] = useState<Photos[]>([]);
  const [albumData, setAlbumData] = useState<Albums[]>([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(12);
  const [page, setPage] = useState(1);

  const handlePageNext = () => {
    setPage(page + 1);
    setOffset(offset + perPage);
  };

  const handlePagePrevious = () => {
    setPage(page - 1);
    setOffset(offset - perPage);
  };

  useEffect(() => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
      setPhotosData(res.data);
      axios.get("https://jsonplaceholder.typicode.com/albums").then((res) => {
        setAlbumData(res.data);
      });
    });
    setLoading(false);
  }, []);

  return (
    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className="container mx-auto mt-20">
        {albumData
          .filter((a: Albums) => {
            return a.id === parseInt(id);
          })
          .map((a: Albums) => (
            <div
              key={a.id}
              className="text-gray-900 text-center my-16 text-2xl"
            >
              Album <p className="font-semibold">{a.title}</p>
            </div>
          ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white mx-16 active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mx-40 ease-linear transition-all duration-150"
          type="button"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <div className="flex flex-wrap justify-center items-center mt-4">
          {photosData.length === 0 ? (
            <div className="cursor-default bg-yellow-500 transition duration-500 hover:bg-yellow-700 text-white py-1 px-5 rounded-full text-center">
              Maaf Photos Belum Tersedia
            </div>
          ) : (
            <>
              {loading && <div>loading...</div>}
              {!loading &&
                photosData
                  .filter((x: Photos) => {
                    return x.albumId === parseInt(id);
                  })
                  .slice(offset, offset + perPage)
                  .map((x: Photos) => (
                    <Link to={`/albums/${x.albumId}/${x.id}`} key={x.id}>
                      <div
                        style={{
                          backgroundImage: `url(${x.thumbnailUrl})`,
                        }}
                        className="container-gallery gambar-gallery shadow-lg ml-2 mb-4"
                      >
                        <div className="flex xl:opacity-0 md:opacity-100 flex-row items-end h-full w-full transition duration-300 hover:bg-black hover:bg-opacity-25 hover:opacity-100 hover:rounded">
                          <div className="flex flex-col w-full pb-3 pt-10 px-3 rounded bg-gradient-to-t from-black text-gray-200">
                            <Link to={`/albums/${x.albumId}/${x.id}`}>
                              <h3 className="text-base font-semibold leading-5 hover:underline">
                                {x.title}
                              </h3>
                            </Link>
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
          <div className="h-8 w-8 ml-1 flex justify-center items-center cursor-pointer">
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

export default Album;
