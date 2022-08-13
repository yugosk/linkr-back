import { Router } from "express";

import authRouter from "./authRouter.js";
import tagsRouter from "./tagsRouter.js"
import postsRouter from "./postsRouter.js";
import usersRouter from "./usersRouter.js";
import alterPostRouter from "./alterPostRouter.js";

const router = Router();

router.use("/", authRouter);
router.use("/",tagsRouter);
router.use("/", postsRouter);
router.use("/users", usersRouter);
router.use("/",alterPostRouter);

export default router;
