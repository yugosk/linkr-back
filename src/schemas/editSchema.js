import joi from "joi";

export const editSchema = joi.object({
    postId: joi.number().required(),
    newDescription: joi.string().allow("").required(),
});