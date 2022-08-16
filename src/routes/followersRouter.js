import { Router } from "express";

import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware/schemaMiddleware.js";
import { newFollowerSchema } from "../schemas/followerSchema.js";
import {
  createNewFollower,
  deleteFollower,
  getFollow,
} from "../controllers/followersController.js";

const router = Router();

router.post(
  "/",
  validateToken,
  schemaMiddleware(newFollowerSchema),
  createNewFollower
);

router.get("/", validateToken, getFollow);
router.delete("/:id", validateToken, deleteFollower);

export default router;
