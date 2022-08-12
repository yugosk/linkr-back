import joi from "joi";

const likeSchema = joi.object({
  userId: joi.string().pattern(/\d+/).required(),
});

export default likeSchema;
