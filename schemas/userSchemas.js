import joi from "joi";

export const operationSchema = joi.object({
  type: joi.string().required(),
  label: joi.string().required(),
  value: joi.number().required()
});
