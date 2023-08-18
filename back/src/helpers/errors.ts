export const ValidationError = (message: string) => {
  const err = new Error(message);
  err.name = "ValidationError";

  throw err;
}