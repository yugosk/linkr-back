import { createLike, deleteLike } from "../repositories/likesRepository.js";

export async function postLike(req, res) {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    await createLike(postId, userId);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function removeLike(req, res) {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    await deleteLike(postId, userId);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}
