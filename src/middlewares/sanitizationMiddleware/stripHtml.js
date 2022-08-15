import { stripHtml } from "string-strip-html";

export default function stripStringHtml(req, res, next) {
  const body = { ...req.body };

  for (const property in body) {
    if (typeof body[property] === "string") {
      body[property] = stripHtml(body[property]).result.trim();
    }
  }

  res.locals.sanitezedBody = body;

  next();
}
