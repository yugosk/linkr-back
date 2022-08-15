import { Router } from "express";
import likeSchema from "../schemas/likeSchema.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware/schemaMiddleware.js";
import { removeLike, postLike } from "../controllers/likesControllers.js";

const likesRouter = Router();

likesRouter.post("/likes/:postId", schemaMiddleware(likeSchema), postLike);
likesRouter.delete("/likes/:postId", removeLike);

export default likesRouter;
