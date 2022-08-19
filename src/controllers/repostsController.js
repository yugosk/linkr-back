import {
  createRepost,
  deleteRepost,
} from "../repositories/repostsRepository.js";

export async function postRepost(req, res) {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    await createRepost(postId, userId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function removeRepost(req, res) {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    await deleteRepost(postId, userId);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}
