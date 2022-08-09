import { Router } from "express";

import { schemaMiddleware } from "../middlewares/schemaMiddleware.js/schemaMiddleware.js";
import { signUp } from "../controllers/authController.js";

import { newUserSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/signup", schemaMiddleware(newUserSchema), signUp);

export default router;
