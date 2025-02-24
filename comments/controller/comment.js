import { randomBytes } from "crypto";
import { commentDB } from "../database/index.js";

export const createComment = (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { text } = req.body;
  const snippetId = req.params.id;

  const comments = commentDB[snippetId] || [];

  console.log("Before adding comment:", commentDB);

  comments.push({ commentId, text });
  commentDB[snippetId] = comments;

  console.log("After adding comment:", commentDB);

  return res.status(201).json({
    success: true,
    message: "comment added",
    comment: { commentId, text },
  });
};

export const getCommentBySnippetId = (req, res) => {
  const snippetId = req.params.id;
  console.log("Fetching comments for snippetId:", snippetId);
  console.log("Current commentDB:", commentDB);

  return res.status(200).json(commentDB[snippetId] || []);
};
