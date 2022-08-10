import { Router } from "express";

import { trending, hashtagPage } from "../controllers/tagsController.js";

const router = Router();
router.get("/trendingtags",trending);
router.get("/hashtag/:hashtag",hashtagPage);

export default router;