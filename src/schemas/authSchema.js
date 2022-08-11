import joi from "joi";

const newUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  username: joi.string().required(),
  picture: joi.string().uri().required(),
});

const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { newUserSchema, userSchema };
