import { Router } from "express";

import authRouter from "./authRouter.js";
import tagsRouter from "./tagsRouter.js"

const router = Router();

router.use("/", authRouter);
router.use("/",tagsRouter);

export default router;
