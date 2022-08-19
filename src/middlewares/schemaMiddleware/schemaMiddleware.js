export function schemaMiddleware(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(res.sanitezedBody, { abortEarly: false });
    if (error) {
      return res.status(422).send(
        error.details.map((error) => {
          return error.message;
        })
      );
    } else {
      next();
    }
  };
}
