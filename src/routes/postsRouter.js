import { Router } from "express";

import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";
import stripStringHtml from "../middlewares/sanitizationMiddleware/stripHtml.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware/schemaMiddleware.js";
import { postSchema } from "../schemas/postSchema.js";
import commentSchema from "../schemas/commentSchema.js";

import {
  newPost,
  getPosts,
  createNewComment,
} from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.post(
  "/posts",
  validateToken,
  stripStringHtml,
  schemaMiddleware(postSchema),
  newPost
);

postsRouter.get("/posts", validateToken, getPosts);

postsRouter.post(
  "/posts/:id/comments",
  validateToken,
  stripStringHtml,
  schemaMiddleware(commentSchema),
  createNewComment
);

export default postsRouter;
