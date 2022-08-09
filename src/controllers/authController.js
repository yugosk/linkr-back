import bcrypt from "bcrypt";

import { findUser, createUser } from "../repositories/authRepository.js";

export async function signUp(req, res) {
  const { email, password, username, picture } = req.body;

  try {
    const { rowCount } = await findUser(email, username);

    if (rowCount !== 0) return res.status(409).send("Cannot create user");

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await createUser(email, hashedPassword, username, picture);

    res.status(201).send("User created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while creating new user");
  }
}
