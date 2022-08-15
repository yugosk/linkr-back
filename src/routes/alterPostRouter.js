import { Router } from "express";

import { deletePost, editPost } from "../controllers/alterPostController.js";
import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js/schemaMiddleware.js";
import { editSchema } from "../schemas/editSchema.js";

const router = Router();
router.put("/editing",validateToken,schemaMiddleware(editSchema), editPost);
router.delete("/deleting/:postId",validateToken,deletePost);

export default router;