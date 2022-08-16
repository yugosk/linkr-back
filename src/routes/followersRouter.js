import { Router } from "express";

import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware/schemaMiddleware.js";
import { newFollowerSchema } from "../schemas/followerSchema.js";
import { createNewFollower } from "../controllers/followersController.js";

const router = Router();

router.post(
  "/",
  validateToken,
  schemaMiddleware(newFollowerSchema),
  createNewFollower
);

export default router;
