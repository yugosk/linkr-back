import { Router } from "express";

import { schemaMiddleware } from "../middlewares/schemaMiddleware.js/schemaMiddleware.js";
import { signUp, signIn } from "../controllers/authController.js";

import { newUserSchema, userSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/signup", schemaMiddleware(newUserSchema), signUp);
router.post("/signin", schemaMiddleware(userSchema), signIn);

export default router;
