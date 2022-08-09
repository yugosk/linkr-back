import jwt from "jsonwebtoken";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const secret = process.env.JWT_SECRET;

  try {
    const userData = jwt.verify(token, secret);
    res.locals.userData = userData;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}
