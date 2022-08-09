import joi from "joi";

export const postSchema = joi.object({
  url: joi
    .string()
    .pattern(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    )
    .required(),
  description: joi.string().allow(""),
});
