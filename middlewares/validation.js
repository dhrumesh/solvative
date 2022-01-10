const joi = require("@hapi/joi");
const { userModel } = require("../models/user.model");
joi.objectId = require('joi-objectid')(joi)

const signupValidation = (data) => {
  const schema = joi.object({
    name: joi.string().trim(true).required(),
    email: joi
      .string()
      .email()
      .trim(true)
      .required()
      .external(async (value) => {
        const emailExist = await userModel.findOne({ email: value });
        if (emailExist) throw new Error("email already exist");

        return value;
      }),
    password: joi.string().min(6).trim(true).required(),
    admin: joi.string().trim(true).required(),
  });

  return schema.validateAsync(data);
};

const toDoValidation = (data) => {
  const schema = joi.object({
    title: joi.string().trim(true).required(),
    status: joi
      .string()
      .trim(true)
      .required()
      .valid("In progress", "Review", "Done"),
    content: joi.string().trim(true).required(),
  });

  return schema.validate(data);
};

const updateToDoValidation = (data) => {
  const schema = joi.object({
    id: joi.objectId().required(),
    title: joi.string().trim(true),
    status: joi.string().trim(true).valid("In progress", "Review", "Done"),
    content: joi.string().trim(true),
  });

  return schema.validate(data);
};

const statusValidation = (data) => {
    const schema = joi.object({
      status: joi.string().trim(true).valid("In progress", "Review", "Done"),
    });
  
    return schema.validate(data);
  };
module.exports = {
  signupValidation,
  toDoValidation,
  updateToDoValidation,
  statusValidation
};
