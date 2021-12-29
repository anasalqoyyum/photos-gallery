import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Users, idParams, Albums } from "../common/types";
import Navbar from "../layouts/Navbar";
import Dropdown from "../layouts/Dropdown";
import Footer from "../layouts/Footer";

const User = () => {
  const { id } = useParams<idParams>();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState<Albums[]>([]);
  const [userData, setUserData] = useState<Users[]>([]);

  const data = albumData.map((t1) => ({
    ...userData.find((t2) => t2.id === t1.userId),
    ...t1,
  }));

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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white mx-8 lg:mx-0 active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <div className="flex flex-wrap justify-center items-center ">
          {userData.length === 0 ? (
            <div className="cursor-default bg-yellow-500 transition duration-500 hover:bg-yellow-700 text-white py-1 px-5 rounded-full text-center">
              Maaf User Tidak Ditemukan
            </div>
          ) : (
            <>
              {loading && <div>loading...</div>}
              {!loading &&
                userData
                  .filter((x: Users) => {
                    return x.id === parseInt(id);
                  })
                  .map((x) => (
                    <div
                      className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg"
                      key={x.id}
                    >
                      <div className="px-6">
                        <div className="flex items-center justify-center text-center my-5">
                          <img
                            alt="..."
                            src="https://i.pravatar.cc/300"
                            className="shadow-xl rounded-full border-none w-40 h-40"
                          />
                        </div>
                        <div className="text-center mt-4">
                          <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                            {x.name} -{" "}
                            <span className="font-light">@{x.username}</span>
                          </h3>
                          <h3 className="text-xl font-medium leading-normal text-blueGray-700 mb-2">
                            {x.email}
                          </h3>
                          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                            {x.address.street} {x.address.suite},{" "}
                            {x.address.city}
                          </div>
                          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            {x.address.zipcode}
                          </div>
                          <div className="mb-2 text-blueGray-600 mt-10">
                            <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                            {x.phone}
                          </div>
                          <div className="mb-2 text-blueGray-600">
                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                            {x.website}
                          </div>
                          <div className="mb-2 text-blueGray-600">
                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                            {x.company.name} | {x.company.catchPhrase} |{" "}
                            {x.company.bs}
                          </div>
                        </div>
                        <div className="mt-10 py-10 border-t border-blueGray-200">
                          <div className="flex flex-wrap justify-center items-center">
                            {data
                              .filter((x) => {
                                return x.userId === parseInt(id);
                              })
                              .map((x, i) => (
                                <Link to={`/albums/${x.id}`} key={i}>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
