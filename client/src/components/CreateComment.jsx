import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateComment = ({ snippetId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8001/api/v1/snippet/${snippetId}/comments`,
        { text }
      );
      console.log(res.data);
      setComments((prevComments) => [...prevComments, res.data.comment]);
      setText("");
    } catch (error) {
      console.log("error occured", error);
    }
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8001/api/v1/snippet/${snippetId}/comments`
        );
        setComments(res.data);
      } catch (error) {}
    };
    fetchComments();
  }, []);

  return (
    <div className="mt-3">
      <ul>
        {comments.map((comment, index) => {
          return (
            <li className="text-sm" key={index}>
              {comment.text}
            </li>
          );
        })}
      </ul>
      <form
        onSubmit={addComment}
        className="grid items-center mt-5 text-center mx-auto w-full gap-4 max-w-md"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add comment"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 w-32 mx-auto">
          Comment
        </button>
      </form>
    </div>
  );  
};

export default CreateComment;
