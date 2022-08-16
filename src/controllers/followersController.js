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

    const { rowCount: followRowCount } = await findFollow({
      followedId,
      followerId,
    });

    if (followRowCount !== 0) {
      return res.status(409).send("Already following this user");
    }

    const {
      rows: [follow],
    } = await createFollow(followedId, followerId);

    res.status(201).send(follow);
  } catch {
    res.status(500).send("Error while creating new follower");
  }
}

export async function deleteFollower(req, res) {
  const { id } = req.params;

  try {
    const { rowCount } = await findFollow({ id });

    if (rowCount === 0) {
      return res.status(404).send("Not found specified follow");
    }

    await deleteFollow(id);

    res.status(200).send();
  } catch {
    res.status(500).send("Error while deleting follower");
  }
}

export async function getFollow(req, res) {
  try {
    const { rows: follow } = await findFollow(req.query);

    res.status(200).send(follow);
  } catch {
    res.status(500).send("Error while getting follows");
  }
}
