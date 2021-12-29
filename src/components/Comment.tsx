import { useState } from "react";
import { useParams } from "react-router";
import { idParams } from "../common/types";

const Comment = () => {
  const { id } = useParams<idParams>();
  const [Comment, setComment] = useState("");
  // const [CommentId, setCommentId] = useState([] as Array<number>);

  const handleComment = (e) => setComment(e.target.value);

  const addComments = (e) => {
    // e.preventDefault();
    const comments = [Comment];
    let storage: any = [];

    storage = JSON.parse(localStorage.getItem("commentsItem" + id) || "0");
    if (!storage) {
      localStorage.setItem("commentsItem" + id, JSON.stringify(comments));
    } else {
      storage.push(Comment);
      localStorage.setItem("commentsItem" + id, JSON.stringify(storage));
    }
  };
  const getArray = JSON.parse(localStorage.getItem("commentsItem" + id) || "0");
  console.log(getArray);
  return (
    <>
      <div className="flex mx-auto items-center justify-center shadow-lg mt-4 mb-4 max-w-lg">
        <form
          onSubmit={addComments}
          className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              Add a new comment
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Type Your Comment"
                onChange={handleComment}
                value={Comment}
                required
              ></textarea>
            </div>
            <div className="w-full md:w-full flex items-start px-3">
              <div className="-mr-1">
                <input
                  type="submit"
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="Post Comment"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Comment;
