import jwt from "jsonwebtoken";

import { findUserById } from "../../repositories/authRepository.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const secret = process.env.JWT_SECRET;

  try {
    const { id } = jwt.verify(token, secret);

    const { rowCount } = await findUserById(id);

    if (rowCount === 0) {
      return res.status(401).send("Invalid token");
    }

    res.locals.userId = id;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send("Invalid token");
  }
}
