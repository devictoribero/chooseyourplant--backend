export class GeneralError extends Error {
  constructor(message?: string) {
    super(`Something unexpected happened. ${message}`);
  }
}
