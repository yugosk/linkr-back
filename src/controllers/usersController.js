import { findUsers } from "../repositories/authRepository.js";

export async function getUsersList(req, res) {
  const { name } = req.query;

  try {
    const { rows: users } = await findUsers(name);

    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while getting users list");
  }
}
