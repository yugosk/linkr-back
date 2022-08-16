import { findUserById } from "../repositories/authRepository.js";
import {
  findFollow,
  createFollow,
  deleteFollow,
} from "../repositories/followersRepository.js";

export async function createNewFollower(req, res) {
  const { userId: followerId } = res.locals;
  const { followedId } = req.body;

  if (followerId === Number(followedId)) {
    return res.status(409).send("Cannot follow yourself");
  }

  try {
    const { rowCount: userRowCount } = await findUserById(followedId);

    if (userRowCount === 0) {
      return res.status(404).send("Cannot follow a user who does not exist");
    }

    const { rowCount: followRowCount } = await findFollow(
      followedId,
      followerId
    );

    if (followRowCount !== 0) {
      return res.status(409).send("Already following this user");
    }

    await createFollow(followedId, followerId);

    res.status(201).send();
  } catch {
    res.status(500).send("Error while creating new follower");
  }
}

export async function deleteFollower(req, res) {
  const { userId: followerId } = res.locals;
  const { id: followedId } = req.params;

  if (followerId === Number(followedId)) {
    return res.status(409).send("Cannot unfollow yourself");
  }

  try {
    const { rowCount: userRowCount } = await findUserById(followedId);

    if (userRowCount === 0) {
      return res.status(404).send("Cannot unfollow a user who does not exist");
    }

    const { rowCount: followRowCount } = await findFollow(
      followedId,
      followerId
    );

    if (followRowCount === 0) {
      return res.status(409).send("Not following this user yet");
    }

    await deleteFollow(followedId, followerId);

    res.status(200).send();
  } catch {
    res.status(500).send("Error while deleting follower");
  }
}
