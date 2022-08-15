import { Router } from "express";

import { trending, hashtagPage } from "../controllers/tagsController.js";
import { validateToken } from "../middlewares/authMiddleware/authMiddleware.js";

const router = Router();
router.get("/trendingtags",trending);
router.get("/hashtag/:hashtag",validateToken, hashtagPage);

export default router;