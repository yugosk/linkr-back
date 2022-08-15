import { Router } from "express";

import stripStringHtml from "../middlewares/sanitizationMiddleware/stripHtml.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware/schemaMiddleware.js";
import { signUp, signIn } from "../controllers/authController.js";

import { newUserSchema, userSchema } from "../schemas/authSchema.js";

const router = Router();

router.post(
  "/signup",
  stripStringHtml,
  schemaMiddleware(newUserSchema),
  signUp
);
router.post("/signin", stripStringHtml, schemaMiddleware(userSchema), signIn);

export default router;
