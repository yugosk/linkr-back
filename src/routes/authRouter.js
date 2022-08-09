import { Router } from "express";

import { schemaMiddleware } from "../middlewares/schemaMiddleware.js/schemaMiddleware.js";
import { signUp, signIn } from "../controllers/authController.js";

import { newUserSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/signup", schemaMiddleware(newUserSchema), signUp);
router.post("/signin", signIn);

export default router;
