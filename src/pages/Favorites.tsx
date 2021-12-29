import { useState } from "react";
import { Photos } from "../common/types";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Dropdown from "../layouts/Dropdown";
import Footer from "../layouts/Footer";

const Favorite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const getArray = JSON.parse(localStorage.getItem("favorites") || "0");

  let favList: any = [{}];
  for (let i = 0; i < getArray.length; i++) {
    let x = getArray[i];
    favList[i] = JSON.parse(localStorage.getItem("favItem" + [x]) || "");
  }

  return (
    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className="container mx-auto mt-20">
        <div className="text-gray-900 text-center my-16 text-2xl">
          <p className="font-semibold">My Favorites Photos</p>
        </div>
        <div className="flex flex-wrap justify-center items-center mt-4">
          {Object.keys(favList[0]).length === 0 ? (
            <div className="cursor-default bg-yellow-500 transition duration-500 hover:bg-yellow-700 text-white py-1 px-5 rounded-full text-center">
              Maaf Anda Belum Memiliki Foto Favorit
            </div>
          ) : (
            <>
              {favList.map((x: Photos) => (
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
      <Footer />
    </>
  );
};

export default Favorite;
