import { Router } from "express";

import { getUsersList } from "../controllers/usersController.js";

const router = Router();

router.get("/", getUsersList);

export default router;
