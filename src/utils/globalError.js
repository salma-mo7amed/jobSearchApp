// function to handle any global error:
export const globalError = (err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message, success: false });
};
