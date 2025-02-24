import express from "express";
import { createComment, getCommentBySnippetId } from "../controller/comment.js";

const router = express.Router();

router.route('/:id/comments')
  .post(createComment)   // Create comment for a snippetId
  .get(getCommentBySnippetId);  // Get all comments for that snippetId

export default router;