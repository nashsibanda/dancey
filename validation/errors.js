module.exports = {
  ValidationError: class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  },
  RecordNotFoundError: class RecordNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "RecordNotFoundError";
    }
  },
  ResourceNotFoundError: class ResourceNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "ResourceNotFoundError";
    }
  },
  NotAuthorizedError: class NotAuthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = "NotAuthorizedError";
    }
  },
};
