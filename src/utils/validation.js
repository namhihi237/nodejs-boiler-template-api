import HttpError from "./http-error";

export const validateRequest = (req, next, schema) => {

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    throw new HttpError(error.details[0].message.replace(/\"/g, ''), 400, false); // select first error message and remove quotes from it
  } else {
    req.body = value;
    next();
  }
};