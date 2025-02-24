import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState({});

  const CreateSnippet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/snippet", {
        title,
        code,
      });
      alert(res.data.message);
    } catch (error) {
      console.log("error occured", error);
    }
  };
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/snippet");
        console.log(res.data);
        setSnippets(res.data);
      } catch (error) {}
    };
    fetchSnippets();
  }, []);
  return (
    <div className="mt-10">
      <form onSubmit={CreateSnippet} className="flex flex-col gap-4 space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="border rounded px-2 py-1 w-fill focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write a code snippet"
          className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
        ></textarea>
        <button className="w-fit bg-blue-500 text-white px-6 rounded cursor-pointer py-2">
          Add
        </button>
      </form>
      <div className="mt-5 grid md:grid-cols-3 gap-2">
        {Object.values(snippets).map((snippet) => {
          return (
            <div key={snippet.id} className="p-3 border rounded">
              <h1 className="font-bold text-xl">{snippet.title}</h1>
              <CreateComment snippetId={snippet.id}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateSnippet;
