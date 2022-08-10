import { Router } from "express";
import { newPost, getPosts } from "../controllers/postsController.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js/schemaMiddleware.js";
import { postSchema } from "../schemas/postSchema.js";
import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";

const postsRouter = Router();

postsRouter.post(
  "/posts",
  validateToken,
  schemaMiddleware(postSchema),
  newPost
);

postsRouter.get("/posts", validateToken, getPosts);

export default postsRouter;
