const notFound = (req, res, next) => {
  console.log('REQ', req);
  const error = new Error(`Not Found - ${req.originalUrl}`)
  console.log('ERROR: ', error.message);
  res.status(404);
  next(error)
}

const errorHandler = (error, req, res, next) => {
  console.log("error", error);
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  // Check for Mongoose bad objectId
  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    message = `Resource not found`;
    statusCode = 404
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production'?  '🎂': error.stack,
  })
}


export { notFound, errorHandler}