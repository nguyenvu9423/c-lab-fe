class ValidationError extends Error {
  constructor(fieldErrors) {
    super();
    this.fieldErrors = fieldErrors;
    this.errorType = 'VALIDATION_ERROR';
  }
}

export { ValidationError };
