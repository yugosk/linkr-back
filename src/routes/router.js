import { Router } from "express";

import authRouter from "./authRouter.js";
import tagsRouter from "./tagsRouter.js"
import postsRouter from "./postsRouter.js";

const router = Router();

router.use("/", authRouter);
router.use("/",tagsRouter);
router.use("/", postsRouter);

export default router;
