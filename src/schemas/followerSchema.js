import joi from "joi";

const newFollowerSchema = joi.object({
  followedId: joi.number().required(),
});

export { newFollowerSchema };
