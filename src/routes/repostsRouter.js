import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";
import { postRepost, removeRepost } from "../controllers/repostsController.js";

const repostsRouter = Router();

repostsRouter.post("/reposts/:postId", validateToken, postRepost);
repostsRouter.delete("/reposts/:postId", validateToken, removeRepost);

export default repostsRouter;
