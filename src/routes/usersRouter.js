import { Router } from "express";

import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";
import { getUsersList } from "../controllers/usersController.js";

const router = Router();

router.get("/", validateToken, getUsersList);

export default router;
