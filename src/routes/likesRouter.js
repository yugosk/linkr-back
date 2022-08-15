import { Router } from "express";
import { removeLike, postLike } from "../controllers/likesControllers.js";
import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";

const likesRouter = Router();

likesRouter.post("/likes/:postId", validateToken, postLike);
likesRouter.delete("/likes/:postId", validateToken, removeLike);

export default likesRouter;
