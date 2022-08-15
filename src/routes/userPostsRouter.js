import { Router } from "express";

import { userPage } from "../controllers/userPostsController.js";
import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";

const router = Router();
router.get("/user/:id",validateToken,userPage);



export default router;


