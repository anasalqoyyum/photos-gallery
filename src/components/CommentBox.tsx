import { useParams } from "react-router";
import { idParams } from "../common/types";

const CommentBox = () => {
  const { id } = useParams<idParams>();
  const Comment = JSON.parse(localStorage.getItem("commentsItem" + id) || "0");

  return (
    <>
      {!Comment ? (
        <div></div>
      ) : (
        Comment.map((x) => (
          <div className="flex mx-auto items-center justify-center border border-gray-400 mt-4 mb-4 max-w-lg">
            <div className="flex flex-wrap -mx-3">
              <div className="flex-1 px-4 sm:px-6 sm:py-4 leading-relaxed">
                <p className="text-sm">{x}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default CommentBox;
