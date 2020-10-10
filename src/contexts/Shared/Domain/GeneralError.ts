export class GeneralError extends Error {
  constructor(message?: string) {
    super(`something unexpected happened. ${message}`);
  }
}
