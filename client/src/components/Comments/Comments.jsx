import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, updateComment, deleteComment } from "../../actions/comments";
import moment from "moment";

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [commentText, setCommentText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleComment = () => {
    dispatch(addComment(post._id, commentText));
    setCommentText("");
  };

  const handleEdit = (commentId) => {
    dispatch(updateComment(post._id, commentId, editText));
    setEditId(null);
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment(post._id, commentId));
  };

  return (
    <div>
      <h3>Comments</h3>
      {post.comments.map((comment) => (
        <div key={comment._id}>
          <p>
            <strong>{comment.creator === user?.result?._id ? "You" : comment.creator}</strong>:{" "}
            {editId === comment._id ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={() => handleEdit(comment._id)}>Save</button>
              </>
            ) : (
              comment.text
            )}
          </p>
          <p>{moment(comment.createdAt).fromNow()}</p>
          {comment.creator === user?.result?._id && (
            <>
              <button onClick={() => {
                setEditId(comment._id);
                setEditText(comment.text);
              }}>
                Edit
              </button>
              <button onClick={() => handleDelete(comment._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      {user?.result && (
        <div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleComment} disabled={!commentText}>
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
