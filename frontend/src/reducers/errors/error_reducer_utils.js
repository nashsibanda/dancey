export const parseErrors = errors => {
  if (typeof errors === "string")
    return [{ name: "StandardError", message: errors }];
  let outputErrors = [];
  errors.message.split(".").forEach(message => {
    let error = { name: errors.name, message: message.trim() };
    outputErrors.push(error);
  });

  return outputErrors;
};
