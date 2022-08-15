import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  findUser,
  findUserByEmail,
  createUser,
} from "../repositories/authRepository.js";

export async function signUp(req, res) {
  const { email, password, username, picture } = res.locals.sanitezedBody;

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

export async function signIn(req, res) {
  const { email, password } = res.locals.sanitezedBody;

  try {
    const {
      rowCount,
      rows: [user],
    } = await findUserByEmail(email);

    if (rowCount === 0) {
      return res.status(401).send("Invalid email or password");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ token, picture: user.picture, userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while loggin in user");
  }
}
