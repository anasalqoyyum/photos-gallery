import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Photos, idParams, Albums, Users } from "../common/types";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import Comment from "../components/Comment";
import Navbar from "../layouts/Navbar";
import Dropdown from "../layouts/Dropdown";
import Footer from "../layouts/Footer";
import CommentBox from "../components/CommentBox";

const Photo = () => {
  const { id, albumid } = useParams<idParams>();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([] as Array<number>);
  const [photosData, setPhotosData] = useState<Photos[]>([]);
  const [albumData, setAlbumData] = useState<Albums[]>([]);
  const [userData, setUserData] = useState<Users[]>([]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const addFav = (props: any) => {
    let array = favorites;
    let addArray = true;
    array.forEach((item: any, key: number) => {
      if (item === props.id) {
        array.splice(key, 1);
        addArray = false;
      }
    });
    if (addArray) {
      array.push(props.id);
    }
    setFavorites([...array]);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    let storage = localStorage.getItem("favItem" + props.id || "0");
    if (storage === null) {
      localStorage.setItem("favItem" + props.id, JSON.stringify(props.x));
    } else {
      localStorage.removeItem("favItem" + props.id);
    }
  };

  const data = albumData.map((t1) => ({
    ...userData.find((t2) => t2.id === t1.userId),
    ...t1,
  }));

  useEffect(() => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
      setPhotosData(res.data);
      axios.get("https://jsonplaceholder.typicode.com/albums").then((res) => {
        setAlbumData(res.data);
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
          setUserData(res.data);
        });
      });
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    const getArray = JSON.parse(localStorage.getItem("favorites") || "0");

    if (getArray !== 0) {
      setFavorites([...getArray]);
    }
  }, []);

  return (
    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className="container mx-auto mt-20">
      <Link to={`/albums/${albumid}`}>
          <button
            className="bg-blue-500 hover:bg-blue-700 mx-8 lg:mx-0 text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </Link>
        <div className="flex flex-wrap justify-center items-center mt-4">
          {photosData.length === 0 ? (
            <div className="cursor-default bg-yellow-500 transition duration-500 hover:bg-yellow-700 text-white py-1 px-5 rounded-full text-center">
              Maaf Photos Tidak Ditemukan
            </div>
          ) : (
            <>
              {loading && <div>loading...</div>}
              {!loading &&
                photosData
                  .filter((x: Photos) => {
                    return x.id === parseInt(id);
                  })
                  .map((x: Photos) => (
                    <div
                      key={x.id}
                      className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg"
                    >
                      <div className="px-6">
                        <div className="flex items-center justify-center text-center my-5">
                          <img
                            alt="..."
                            src={x.url}
                            className="shadow-xl border-none w-1/4 h-1/4"
                          />
                        </div>
                        <div className="text-center items-center justify-center mt-4">
                          <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 my-2">
                            {x.title}
                          </h3>
                          {data
                            .filter((x) => {
                              return x.id === parseInt(albumid);
                            })
                            .map((x, i) => (
                              <h3
                                key={i}
                                className="text-xl font-medium leading-normal text-blueGray-700 mb-2"
                              >
                                Uploaded by{" "}
                                <Link to={`/users/${x.userId}`}>
                                  <span className="hover:underline hover:font-bold">
                                    {x.name}
                                  </span>
                                </Link>
                                <p className="text-base">{x.email}</p>
                              </h3>
                            ))}{" "}
                        </div>
                        <div className="flex items-center justify-center text-center my-5">
                          {favorites.includes(id) ? (
                            <IoHeart
                              onClick={() => addFav({ x, id })}
                              style={{ color: "red" }}
                              size={32}
                            />
                          ) : (
                            <IoHeartOutline
                              onClick={() => addFav({ x, id })}
                              style={{ color: "red" }}
                              size={32}
                            />
                          )}
                        </div>
                        <div className="mt-10 py-10 border-t border-blueGray-200">
                          <div className="flex flex-wrap justify-center items-center"></div>
                          <Comment />
                          <CommentBox />
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

export default Photo;
