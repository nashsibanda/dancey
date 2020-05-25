export const parseErrors = errors => {
  let outputErrors = [];
  const errorMessageArray = errors.message
    .split(".")
    .map(message => message.trim());

  errors.message.split(".").forEach(message => {
    let error = { name: errors.name, message: message.trim() };
    outputErrors.push(error);
  });

  return outputErrors;

  // return { name: errors.name, messages: errorMessageArray };
};
