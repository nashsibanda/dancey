export const parseErrors = errors => {
  let outputErrors = [];
  errors.message.split(".").forEach(message => {
    let error = { name: errors.name, message: message.trim() };
    outputErrors.push(error);
  });

  return outputErrors;
};
