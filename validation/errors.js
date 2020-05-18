module.exports = {
  ValidationError: class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  },
  RecordNotFoundError: class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "RecordNotFoundError";
    }
  },
};
