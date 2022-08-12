import { createLike, deleteLike } from "../repositories/likesRepository.js";

export async function postLike(req, res) {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    await createLike(postId, userId);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function removeLike(req, res) {
  const { postId } = req.params;
  const { userId } = req.query;
  try {
    await deleteLike(postId, userId);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
}
